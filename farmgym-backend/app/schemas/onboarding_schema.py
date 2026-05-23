from pydantic import BaseModel

from pydantic import Field


class OnboardingRequest(BaseModel):

    requested_role: str = Field(
        min_length=3,
        max_length=50
    )

    city: str

    state: str

    experience_level: str