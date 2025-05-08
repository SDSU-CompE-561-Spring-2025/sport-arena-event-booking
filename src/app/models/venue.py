from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class Venue(Base):
    __tablename__ = "venues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    venue_id = Column(Integer, unique=True, index=True, autoincrement=True, nullable=True)
    location = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    event_type = Column(String, nullable=False)
    image = Column(String, nullable=True)  # default null
    availability = Column(Boolean, default=True)
    hourly_rate = Column(Float, nullable=False)
    contact_info = Column(String, nullable=True)  # default null
    venue_hours = relationship("VenueHours", backref="venue", cascade="all, delete-orphan")
    deleted = Column(Boolean, default=False)

    owners = relationship("VenueOwner", back_populates="venue")

