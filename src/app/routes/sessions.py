from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db
from app.schemas.session import SessionResponse
import app.services.session as session_service

router = APIRouter()

@router.get("/", response_model=List[SessionResponse])
def list_sessions(db: Session = Depends(get_db)):
    return session_service.list_sessions_service(db)

@router.get("/{session_id}", response_model=SessionResponse)
def get_session(session_id: int, db: Session = Depends(get_db)):
    sess = session_service.get_session_by_id_service(session_id, db)
    if not sess:
        raise HTTPException(status_code=404, detail="Session not found")
    return sess
