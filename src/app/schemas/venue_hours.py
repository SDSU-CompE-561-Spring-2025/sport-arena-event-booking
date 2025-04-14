from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class VenueHoursCreate(BaseModel):
    venue_id: int
    open_time: datetime
    close_time: datetime
    blackout_days: Optional[List[str]] = []

class VenueHoursResponse(BaseModel):
    id: int
    venue_id: int
    open_time: datetime
    close_time: datetime
    last_updated: Optional[datetime]
    blackout_days: Optional[str] = None
    deleted: Optional[bool] = False

    class Config:
        orm_mode = True