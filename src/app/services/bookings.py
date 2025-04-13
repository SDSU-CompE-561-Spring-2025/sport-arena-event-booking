from sqlalchemy.orm import Session
from app.models.bookings import Booking
from app.schemas.bookings import BookingCreate, BookingUpdate

def create_booking_service(booking_data: BookingCreate, db: Session):
    new_booking = Booking(**booking_data.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

def list_bookings_service(db: Session):
    return db.query(Booking).all()

def get_booking_by_id_service(booking_id: int, db: Session):
    return db.query(Booking).filter(Booking.id == booking_id).first()

def update_booking_service(booking_id: int, update_data: BookingUpdate, db: Session):
    booking = get_booking_by_id_service(booking_id, db)
    if not booking:
        return None
    # Update only fields that are provided (not None)
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking

def delete_booking_service(booking_id: int, db: Session):
    booking = get_booking_by_id_service(booking_id, db)
    if not booking:
        return False
    db.delete(booking)
    db.commit()
    return True
