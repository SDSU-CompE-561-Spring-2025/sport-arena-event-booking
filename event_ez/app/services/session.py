from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.models.session import Session as SessionModel
from app.schemas.session import SessionBase

def list_sessions_service(db: Session):
    return db.query(SessionModel).all()

def get_session_by_id_service(session_id: int, db: Session):
    return db.query(SessionModel).filter(SessionModel.id == session_id).first()

def create_session_service(session_token: str, db: Session):
    new_session = SessionModel(session_token=session_token)
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

def logout_session_service(session_token: str, db: Session):
    session_obj = db.query(SessionModel).filter(SessionModel.session_token == session_token).first()
    if session_obj:
        session_obj.logout_time = func.now()
        db.commit()
        db.refresh(session_obj)
    return session_obj
