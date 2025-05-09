from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from sqlalchemy import Boolean, Column, Integer, String
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
    user_role: int
    created_at: datetime
    deleted: bool

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    class Config:
        orm_mode = True