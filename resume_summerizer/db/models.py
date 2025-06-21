from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Salary(BaseModel):
    min: float
    max: float
    currency: str

class CompanyInfo(BaseModel):
    name: str
    description: str
    locations: List[str]
    website: Optional[str] = None

class JobPost(BaseModel):
    title: str
    summary: str
    description: str
    requirements: List[str]
    responsibilities: List[str]

    requiredSkills: List[str]
    niceToHaveSkills: Optional[List[str]] = []

    experienceYears: int
    isRemote: bool

    salary: Salary
    benefits: List[str]
    tags: List[str]

    company: CompanyInfo
    status: str = "active"

    deadline: datetime
    createdAt: Optional[datetime] = None  # <-- Optional
    updatedAt: Optional[datetime] = None  # <-- Optional
