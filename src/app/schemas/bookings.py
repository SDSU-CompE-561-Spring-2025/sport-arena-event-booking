from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookingCreate(BaseModel):
    user_id: int
    venue_id: int
    date: date
    time_slot: str
    hours: int

class BookingResponse(BaseModel):
    id: int
    user_id: int
    venue_id: int
    date: date
    time_slot: str
    hours: int
    status: str

    class Config:
        orm_mode = True