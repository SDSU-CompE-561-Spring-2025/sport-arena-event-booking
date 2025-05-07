from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.bookings import BookingCreate, BookingUpdate, BookingResponse
from app.services import bookings as booking_service
from app.dependencies import get_db
from app.core.auth import get_current_user
from app.models.user import User


router = APIRouter(prefix="", tags=["bookings"])


@router.post("/", response_model=BookingResponse)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return booking_service.create_booking(db, booking_data, user_id=current_user.id)


@router.get("/", response_model=list[BookingResponse])
def get_my_bookings(
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user)
):
   return booking_service.get_user_bookings(db, current_user.id)


@router.get("/all", response_model=list[BookingResponse])
def get_all_bookings(
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user)
):
   # if current_user.role != "main_admin":
   #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
   return booking_service.get_all_bookings(db)


@router.delete("/{booking_id}")
def delete_booking(
   booking_id: int,
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user)
):
   success = booking_service.delete_booking(db, booking_id, current_user.id)
   if not success:
       raise HTTPException(status_code=404, detail="Booking not found or access denied")
   return {"detail": "Booking deleted successfully"}


@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(
   booking_id: int,
   update_data: BookingUpdate,
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user)
):
   updated = booking_service.update_booking(db, booking_id, current_user.id, update_data)
   if not updated:
       raise HTTPException(status_code=404, detail="Booking not found or access denied")
   return updated


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking_by_id(
   booking_id: int,
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user)
):
   booking = booking_service.get_booking_by_id(db, booking_id)
  
   if current_user.user_role != 0 and booking.user_id != current_user.id:
       raise HTTPException(status_code=403, detail="Access denied")


   return booking
