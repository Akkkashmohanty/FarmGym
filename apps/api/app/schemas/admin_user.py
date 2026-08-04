from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.user import UserRole


class AdminUserResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    full_name: str
    email: str
    role: UserRole

    xp_points: int
    level: int
    streak_days: int

    created_at: datetime


class UpdateUserRoleRequest(BaseModel):
    role: UserRole