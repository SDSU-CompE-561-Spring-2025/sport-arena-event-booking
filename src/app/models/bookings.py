from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.core.database import Base


class Booking(Base):
   __tablename__ = "bookings" 


   id = Column(Integer, primary_key=True, index=True)
   user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
   venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
   date = Column(Date, nullable=False)
   time_slot = Column(String, nullable=False)
   hours = Column(Integer, nullable=False)
   status = Column(String, default="confirmed")
