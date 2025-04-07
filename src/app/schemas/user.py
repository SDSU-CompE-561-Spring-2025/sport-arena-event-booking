from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    user_role: int
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone_number: str

class UserResponse(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    created_at: datetime
    deleted: bool

    class Config:
        orm_mode = True