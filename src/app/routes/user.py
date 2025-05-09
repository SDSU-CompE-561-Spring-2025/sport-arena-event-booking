from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.auth import create_access_token, pwd_context, get_password_hash
from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from datetime import timedelta
from app.core.config import settings
from app.core.auth import get_current_user, require_admin, oauth2_scheme
from app.services.user import register_user_service, login_user_service, update_user_service,delete_user_service, get_profile_service,get_user_by_id_service, list_users_service,logout_user_service
from app.schemas.token import Token
from app.core.auth import get_current_user
from typing import List
from sqlalchemy.orm import Session
from app.dependencies import get_db
import jwt
from jwt import PyJWTError as JWTError


router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return register_user_service(user, db)

@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/user/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return get_user_by_id_service(user_id, db)

@router.post("/login", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login_user_service(form_data, db)

@router.put("/update/me", response_model=UserResponse)
def update_my_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_user_service(current_user.id, update_data, db)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username, User.deleted == False).first()
    if user is None:
        raise credentials_exception

    return user

@router.delete("/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user_service(user_id, db)

@router.get("/users", response_model=List[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return list_users_service(db)

@router.post("/users/create", response_model=UserResponse)
def create_user_by_admin(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)  
):
    return register_user_service(user, db)

@router.post("/logout")
def logout_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return logout_user_service(token, db)
