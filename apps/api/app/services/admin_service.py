from fastapi import HTTPException, status

from app.models.admin import (
    AdminAnnouncement,
    AdminReport,
)

from app.repositories.admin_repository import (
    AdminRepository,
)

from app.schemas.admin import (
    AdminAnnouncementCreate,
    AdminReportCreate,
)


class AdminService:
    def __init__(
        self,
        repository: AdminRepository,
    ):
        self.repository = repository

    # --------------------------------
    # ANNOUNCEMENTS
    # --------------------------------

    def create_announcement(
        self,
        *,
        admin_id: int,
        payload: AdminAnnouncementCreate,
    ):
        announcement = AdminAnnouncement(
            admin_id=admin_id,
            title=payload.title,
            message=payload.message,
        )

        return self.repository.create_announcement(
            announcement,
        )

    def list_announcements(
        self,
    ):
        return self.repository.list_announcements()

    # --------------------------------
    # REPORTS
    # --------------------------------

    def create_report(
        self,
        *,
        reporter_id: int,
        payload: AdminReportCreate,
    ):
        report = AdminReport(
            reporter_id=reporter_id,
            report_type=payload.report_type,
            target_id=payload.target_id,
            reason=payload.reason,
        )

        return self.repository.create_report(
            report,
        )

    def list_reports(
        self,
    ):
        return self.repository.list_reports()

    def resolve_report(
        self,
        report_id: int,
    ):
        report = self.repository.get_report(
            report_id,
        )

        if report is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Report not found.",
            )

        report.status = "RESOLVED"

        return self.repository.save_report(
            report,
        )