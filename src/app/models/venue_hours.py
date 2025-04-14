from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, Boolean
from sqlalchemy.dialects.postgresql import JSON
from app.core.database import Base

class VenueHours(Base):
    __tablename__ = "venue_hours"

    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
    open_time = Column(DateTime)
    close_time = Column(DateTime)
    last_updated = Column(DateTime)
    blackout_days = Column(JSON)  # Storing list of strings
    deleted = Column(Boolean, default=False)