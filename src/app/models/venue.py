from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class Venue(Base):
    __tablename__ = "venues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    venue_id = Column(Integer, nullable=False)
    location = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    event_type = Column(String, nullable=False)
    image = Column(String, nullable=True)  # default null
    availability = Column(Boolean, default=True)
    hourly_rate = Column(Float, nullable=False)
    contact_info = Column(String, nullable=True)  # default null
    deleted = Column(Boolean, default=False)

    owners = relationship("VenueOwner", back_populates="venue")

