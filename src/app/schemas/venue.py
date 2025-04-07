from pydantic import BaseModel
from typing import Optional

class VenueCreate(BaseModel):
    name: str
    venue_id: int
    location: str
    capacity: int
    event_type: str
    image: Optional[str] = None
    availability: Optional[bool] = True
    hourly_rate: float

class VenueResponse(BaseModel):
    id: int
    name: str
    location: str
    event_type: str
    availability: bool
    hourly_rate: float
    deleted: bool

    class Config:
        orm_mode = True