from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
)


class AdminAnnouncementCreate(BaseModel):
    title: str
    message: str


class AdminAnnouncementResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    admin_id: int
    title: str
    message: str
    created_at: datetime


class AdminReportCreate(BaseModel):
    report_type: str
    target_id: int
    reason: str


class AdminReportResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    reporter_id: int
    report_type: str
    target_id: int
    reason: str
    status: str
    created_at: datetime