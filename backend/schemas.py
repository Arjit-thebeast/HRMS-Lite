from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import List, Optional

class AttendanceBase(BaseModel):
    status: str
    date: date

class AttendanceCreate(AttendanceBase):
    employee_id: int

class Attendance(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class EmployeeBase(BaseModel):
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    joined_at: datetime
    attendance: List[Attendance] = []

    class Config:
        from_attributes = True
