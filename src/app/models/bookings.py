from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Booking(Base):
    _tablename_ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
    date = Column(Date, nullable=False)
    time_slot = Column(String, nullable=False)  # Can be improved later using Enum or TimeRange
    hours = Column(Integer, nullable=False)
    status = Column(String, default="confirmed")