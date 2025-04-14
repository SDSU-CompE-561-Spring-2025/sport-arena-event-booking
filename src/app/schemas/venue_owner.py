from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import Boolean, Column, Integer, String
from typing import Optional

class VenueOwnerCreate(BaseModel):
    venue_id: int
    user_id: int

class VenueOwnerResponse(BaseModel):
    id: int
    user_id: int
    venue_id: int
    created_at: datetime
    deleted: bool

    class Config:
        orm_mode = True

class VenueOwnerUpdate(BaseModel):
    user_id: Optional[int] = None
    venue_id: Optional[int] = None
    deleted: Optional[bool] = None 

    class Config:
        orm_mode = True