from pydantic import BaseModel
from datetime import time
from typing import Optional, List

class EmbeddedVenueHours(BaseModel):
    open_time: time
    close_time: time
    blackout_days: Optional[str] = None

class VenueCreate(BaseModel):
    name: str
    venue_id: Optional[int] = None
    location: str
    capacity: int
    event_type: str
    image: Optional[str] = None
    availability: Optional[bool] = True
    hourly_rate: float
    contact_info: Optional[str] = None
    venue_hours: Optional[List[EmbeddedVenueHours]] = None

class VenueResponse(BaseModel):
    venue_id: Optional[int] = None
    name: str
    location: str
    event_type: str
    capacity: int
    availability: bool
    hourly_rate: float
    deleted: bool
    image: Optional[str] = None

    class Config:
        orm_mode = True

class VenueHoursUpdate(BaseModel):
    open_time: Optional[time] = None
    close_time: Optional[time] = None
    blackout_days: Optional[str] = None

class VenueUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    event_type: Optional[str] = None
    availability: Optional[bool] = None
    hourly_rate: Optional[float] = None
    venue_hours: Optional[VenueHoursUpdate] = None

    class Config:
        orm_mode = True