from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    dob: date
    department: str
    year: int
    section: str
    roll_no: str

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    dob: Optional[date] = None
    department: Optional[str] = None
    year: Optional[int] = None
    section: Optional[str] = None
    roll_no: Optional[str] = None

class StudentOut(StudentCreate):
    id: str
    qr_code: str  # base64 image
