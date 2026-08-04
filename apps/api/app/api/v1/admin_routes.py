from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User, UserRole

from app.repositories.admin_repository import (
    AdminRepository,
)

from app.repositories.admin_user_repository import (
    AdminUserRepository,
)

from app.schemas.admin import (
    AdminAnnouncementCreate,
    AdminAnnouncementResponse,
    AdminReportCreate,
    AdminReportResponse,
)

from app.schemas.admin_user import (
    AdminUserResponse,
    UpdateUserRoleRequest,
)

from app.services.admin_service import (
    AdminService,
)

from app.services.admin_user_service import (
    AdminUserService,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


def get_service(
    db: Session = Depends(get_db),
):
    repository = AdminRepository(db)

    return AdminService(repository)


def get_user_service(
    db: Session = Depends(get_db),
):
    repository = AdminUserRepository(db)

    return AdminUserService(repository)


def require_admin(
    current_user: User = Depends(get_current_user),
):
    if current_user.role != UserRole.ADMIN:
        raise PermissionError("Admin access required.")

    return current_user


# ---------------------------------------
# Announcements
# ---------------------------------------

@router.post(
    "/announcements",
    response_model=AdminAnnouncementResponse,
)
def create_announcement(
    payload: AdminAnnouncementCreate,
    current_user: User = Depends(require_admin),
    service: AdminService = Depends(get_service),
):
    return service.create_announcement(
        admin_id=current_user.id,
        payload=payload,
    )


@router.get(
    "/announcements",
    response_model=list[AdminAnnouncementResponse],
)
def list_announcements(
    service: AdminService = Depends(get_service),
):
    return service.list_announcements()


# ---------------------------------------
# Reports
# ---------------------------------------

@router.post(
    "/reports",
    response_model=AdminReportResponse,
)
def create_report(
    payload: AdminReportCreate,
    current_user: User = Depends(get_current_user),
    service: AdminService = Depends(get_service),
):
    return service.create_report(
        reporter_id=current_user.id,
        payload=payload,
    )


@router.get(
    "/reports",
    response_model=list[AdminReportResponse],
)
def list_reports(
    current_user: User = Depends(require_admin),
    service: AdminService = Depends(get_service),
):
    return service.list_reports()


@router.patch(
    "/reports/{report_id}/resolve",
    response_model=AdminReportResponse,
)
def resolve_report(
    report_id: int,
    current_user: User = Depends(require_admin),
    service: AdminService = Depends(get_service),
):
    return service.resolve_report(
        report_id,
    )


# ---------------------------------------
# USER MANAGEMENT
# ---------------------------------------

@router.get(
    "/users",
    response_model=list[AdminUserResponse],
)
def list_users(
    current_user: User = Depends(require_admin),
    service: AdminUserService = Depends(
        get_user_service,
    ),
):
    return service.list_users()


@router.patch(
    "/users/{user_id}/role",
    response_model=AdminUserResponse,
)
def update_user_role(
    user_id: int,
    payload: UpdateUserRoleRequest,
    current_user: User = Depends(require_admin),
    service: AdminUserService = Depends(
        get_user_service,
    ),
):
    return service.update_role(
        user_id=user_id,
        role=payload.role,
    )


@router.delete(
    "/users/{user_id}",
)
def delete_user(
    user_id: int,
    current_user: User = Depends(require_admin),
    service: AdminUserService = Depends(
        get_user_service,
    ),
):
    return service.delete_user(
        user_id,
    )