from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Salary(BaseModel):
    min: float
    max: float
    currency: str

class JobPost(BaseModel):
    title: str
    description: str
    requirements: List[str]
    responsibilities: List[str]
    employmentType: str  # e.g., "Full-time", "Part-time", etc.

    locationType: str  # "Remote", "On-site", "Hybrid"
    isRemote: bool

    salary: Salary

    benefits: List[str]
    tags: List[str]
    experienceLevel: str  # e.g., "Junior", "Mid", "Senior"
    category: str         # e.g., "Engineering", "Marketing"

    postedBy: str
    status: str = "active"  # default: active

    deadline: datetime
    createdAt: datetime
    updatedAt: datetime
