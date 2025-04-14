from pydantic import BaseModel
from datetime import time
from typing import List, Optional

class VenueHoursCreate(BaseModel):
    venue_id: int
    open_time: time
    close_time: time
    blackout_days: Optional[List[str]] = []

class VenueHoursResponse(BaseModel):
    id: int
    venue_id: int
    open_time: time
    close_time: time
    last_updated: Optional[datetime]
    blackout_days: Optional[str] = None
    deleted: Optional[bool] = False

    class Config:
        orm_mode = True