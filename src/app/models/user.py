from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # optional self-reference
    user_role = Column(Integer, nullable=False)
    username = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    deleted = Column(Boolean, default=False)

    owned_venues = relationship("VenueOwner", back_populates="user")