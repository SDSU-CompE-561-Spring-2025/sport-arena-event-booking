from pydantic import BaseModel
from datetime import date
from datetime import datetime

from typing import Optional


class BookingCreate(BaseModel):
    venue_id: int
    event_name: Optional[str] = None
    start_time: datetime
    end_time: datetime
    message: Optional[str] = None


class BookingUpdate(BaseModel):
   venue_id: Optional[int] = None
   booking_date: Optional[date] = None
   time_slot: Optional[str] = None
   hours: Optional[int] = None


class BookingResponse(BaseModel):
    id: int
    user_id: Optional[int]
    venue_id: int
    event_name: Optional[str]
    start_time: datetime
    end_time: datetime
    message: Optional[str]

    class Config:
        orm_mode = True
