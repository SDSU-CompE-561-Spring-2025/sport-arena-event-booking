from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db
from app.schemas.bookings import BookingCreate, BookingUpdate, BookingResponse
import app.services.bookings as booking_service

router = APIRouter()

@router.post("/create", response_model=BookingResponse)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    return booking_service.create_booking_service(booking, db)

@router.get("/", response_model=List[BookingResponse])
def list_bookings(db: Session = Depends(get_db)):
    return booking_service.list_bookings_service(db)

@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = booking_service.get_booking_by_id_service(booking_id, db)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/update/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, update_data: BookingUpdate, db: Session = Depends(get_db)):
    updated_booking = booking_service.update_booking_service(booking_id, update_data, db)
    if not updated_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return updated_booking

@router.delete("/delete/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    success = booking_service.delete_booking_service(booking_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"detail": "Booking deleted successfully"}
