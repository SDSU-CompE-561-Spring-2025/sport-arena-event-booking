from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.core.database import Base


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    venue_id = Column(Integer, ForeignKey("venues.id"))
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    event_name = Column(String, nullable=True)
    message = Column(String, nullable=True)

