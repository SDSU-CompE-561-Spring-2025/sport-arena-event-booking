from pydantic import BaseModel
from datetime import date
from typing import Optional


class BookingCreate(BaseModel):
   user_id: int
   venue_id: int
   date: date
   time_slot: str
   hours: int


class BookingUpdate(BaseModel):
   venue_id: Optional[int] = None
   date: Optional[date] = None
   time_slot: Optional[str] = None
   hours: Optional[int] = None


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