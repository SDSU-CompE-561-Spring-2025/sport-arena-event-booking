from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, Boolean, Time
from sqlalchemy.dialects.postgresql import JSON
from app.core.database import Base
from datetime import datetime

class VenueHours(Base):
    __tablename__ = "venue_hours"

    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
    open_time = Column(Time, nullable=False)
    close_time = Column(Time, nullable=False)
    last_updated = Column(DateTime, nullable=False, default=datetime.utcnow)
    blackout_days = Column(JSON)  # Storing list of strings
    deleted = Column(Boolean, default=False)