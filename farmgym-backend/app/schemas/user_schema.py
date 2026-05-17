from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class UserCreate(BaseModel):

    full_name: str

    email: EmailStr

    password: str = Field(
        min_length=6,
        max_length=50
    )


class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    class Config:
        from_attributes = True