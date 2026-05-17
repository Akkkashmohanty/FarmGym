from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import field_validator

import re


class UserCreate(BaseModel):

    full_name: str = Field(
        min_length=3,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=50
    )

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain at least one uppercase letter"
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain at least one lowercase letter"
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain at least one number"
            )

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError(
                "Password must contain at least one special character"
            )

        return value

    @field_validator("email")
    @classmethod
    def validate_email_domain(cls, value):

        domain = value.split("@")[-1]

        if "." not in domain:
            raise ValueError(
                "Invalid email domain"
            )

        return value


class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    class Config:
        from_attributes = True