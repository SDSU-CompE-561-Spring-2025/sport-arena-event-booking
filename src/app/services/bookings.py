from sqlalchemy.orm import Session
from app.models.bookings import Booking
from app.schemas.bookings import BookingCreate, BookingUpdate, BookingResponse
from typing import List
from fastapi import HTTPException
from typing import Optional


def create_booking(db: Session, booking_data: BookingCreate, user_id: Optional[int] = None) -> Booking:
    print("Incoming booking:", booking_data)
    data = booking_data.dict()
    data['user_id'] = user_id  # This will be None if unauthenticated
    new_booking = Booking(**data)
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

def get_user_bookings(db: Session, user_id: int) -> List[Booking]:
   return db.query(Booking).filter(Booking.user_id == user_id).all()

def get_all_bookings(db: Session) -> List[Booking]:
   return db.query(Booking).all()

def delete_booking(db: Session, booking_id: int, user_id: int) -> bool:
   booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == user_id).first()
   if booking:
       db.delete(booking)
       db.commit()
       return True
   return False

def update_booking(db: Session, booking_id: int, user_id: int, update_data: BookingUpdate) -> Booking:
   booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == user_id).first()
   if not booking:
       return None

   for field, value in update_data.dict(exclude_unset=True).items():
       setattr(booking, field, value)

   db.commit()
   db.refresh(booking)
   return booking

def get_booking_by_id(db: Session, booking_id: int) -> Booking:
   booking = db.query(Booking).filter(Booking.id == booking_id).first()
   if not booking:
       raise HTTPException(status_code=404, detail="Booking not found")
   return booking   

