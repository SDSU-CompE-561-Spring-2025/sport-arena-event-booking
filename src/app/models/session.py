from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Session(Base):
    _tablename_ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_token = Column(String(255), unique=True, nullable=False)
    login_time = Column(DateTime, nullable=False, server_default=func.now())
    logout_time = Column(DateTime, nullable=True)