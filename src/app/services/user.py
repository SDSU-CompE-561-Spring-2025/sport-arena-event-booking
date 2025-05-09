from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.core.auth import get_password_hash
from starlette.status import HTTP_400_BAD_REQUEST
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta, datetime
from app.core.auth import create_access_token, verify_password
from app.core.config import settings
from app.schemas.token import Token
from starlette.status import HTTP_400_BAD_REQUEST
from typing import List
from app.models.session import Session


def register_user_service(user: UserCreate, db: Session) -> User:
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = User(
        user_role=user.user_role,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=get_password_hash(user.password),
        phone_number=user.phone_number,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login_user_service(form_data: OAuth2PasswordRequestForm, db: Session) -> Token:
    user = db.query(User).filter(User.email == form_data.username).first()
    if user:
        print("Stored hash:", user.password_hash)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    new_session = Session(session_token=access_token)
    db.add(new_session)
    db.commit()

    return {"access_token": access_token, "token_type": "bearer", "user_role": user.user_role}

def get_profile_service(current_user: User) -> User:
    return current_user

def update_user_service(user_id: int, update_data: UserUpdate, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id, User.deleted == False).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user


def delete_user_service(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id, User.deleted == False).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.deleted = True
    db.commit()
    return {"message": f"User {user_id} marked as deleted"}

def get_user_by_id_service(user_id: int, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id, User.deleted == False).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def list_users_service(db: Session) -> List[User]:
    return db.query(User).filter(User.deleted == False).all()

def logout_user_service(token: str, db: Session):
    session = db.query(Session).filter(Session.session_token == token).first()
    if not session or session.logout_time:
        raise HTTPException(status_code=404, detail="Session not found or already logged out")

    session.logout_time = datetime.utcnow()
    db.commit()
    return {"message": "User logged out successfully"}

