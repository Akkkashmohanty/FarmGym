from pydantic import BaseModel
from pydantic import Field


class FarmerProfileCreate(BaseModel):

    city: str = Field(
        min_length=2,
        max_length=100
    )

    state: str = Field(
        min_length=2,
        max_length=100
    )

    farming_type: str

    balcony_size: str

    experience_level: str

    preferred_crops: str


class FarmerProfileResponse(BaseModel):

    id: int

    user_id: int

    city: str

    state: str

    farming_type: str

    balcony_size: str

    experience_level: str

    preferred_crops: str

    profile_image: str | None

    class Config:
        from_attributes = True