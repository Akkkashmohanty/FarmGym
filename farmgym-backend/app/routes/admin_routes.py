from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.utils.auth_dependencies import (
    get_admin_user
)

from app.models.user_model import User

from app.services.admin_service import (
    get_pending_users,
    approve_user,
    reject_user
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/pending-users")
def pending_users(
    db: Session = Depends(get_db),
    admin_user: User = Depends(
        get_admin_user
    )
):

    users = get_pending_users(db)

    return users


@router.put("/approve/{user_id}")
def approve_pending_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(
        get_admin_user
    )
):

    user = approve_user(
        db,
        user_id
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User approved successfully",
        "role": user.role,
        "status": user.status
    }


@router.put("/reject/{user_id}")
def reject_pending_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(
        get_admin_user
    )
):

    user = reject_user(
        db,
        user_id
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User rejected successfully",
        "status": user.status
    }