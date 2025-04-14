from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class VenueOwner(Base):
    __tablename__ = "venue_owners"

    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted = Column(Boolean, default=False)

    user = relationship("User", back_populates="owned_venues")
    venue = relationship("Venue", back_populates="owners")