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
                "Password must contain uppercase letter"
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain lowercase letter"
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain number"
            )

        if not re.search(
            r"[!@#$%^&*(),.?\":{}|<>]",
            value
        ):
            raise ValueError(
                "Password must contain special character"
            )

        return value


class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    requested_role: str | None

    status: str

    is_active: bool

    is_admin: bool

    class Config:
        from_attributes = True