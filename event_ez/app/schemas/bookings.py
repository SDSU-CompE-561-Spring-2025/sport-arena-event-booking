from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookingBase(BaseModel):
    user_id: int
    venue_id: int
    date: date
    time_slot: str
    hours: int
    status: str = "confirmed"

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    time_slot: str = None
    hours: int = None
    status: str

class BookingResponse(BookingBase):
    id: int

    class Config:
        orm_mode = True