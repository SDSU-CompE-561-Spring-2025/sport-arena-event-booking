from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SessionCreate(BaseModel):
    session_token: str

class SessionResponse(BaseModel):
    id: int
    session_token: str
    login_time: datetime
    logout_time: Optional[datetime] = None

    class Config:
        orm_mode = True