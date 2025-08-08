from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    principal = "principal"
    hod = "hod"
    tutor = "tutor"
    staff = "staff"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: Role

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
