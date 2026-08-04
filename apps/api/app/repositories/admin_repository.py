from sqlalchemy.orm import Session

from app.models.admin import (
    AdminAnnouncement,
    AdminReport,
)


class AdminRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # --------------------------------
    # ANNOUNCEMENTS
    # --------------------------------

    def create_announcement(
        self,
        announcement: AdminAnnouncement,
    ):
        self.db.add(announcement)
        self.db.commit()
        self.db.refresh(announcement)
        return announcement

    def list_announcements(
        self,
    ):
        return (
            self.db.query(AdminAnnouncement)
            .order_by(
                AdminAnnouncement.created_at.desc(),
            )
            .all()
        )

    # --------------------------------
    # REPORTS
    # --------------------------------

    def create_report(
        self,
        report: AdminReport,
    ):
        self.db.add(report)
        self.db.commit()
        self.db.refresh(report)
        return report

    def list_reports(
        self,
    ):
        return (
            self.db.query(AdminReport)
            .order_by(
                AdminReport.created_at.desc(),
            )
            .all()
        )

    def get_report(
        self,
        report_id: int,
    ):
        return (
            self.db.query(AdminReport)
            .filter(
                AdminReport.id == report_id,
            )
            .first()
        )

    def save_report(
        self,
        report: AdminReport,
    ):
        self.db.commit()
        self.db.refresh(report)
        return report
        