from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.utils.auth_dependencies import (
    get_current_user
)

from app.models.user_model import User

from app.schemas.onboarding_schema import (
    OnboardingRequest
)

from app.services.onboarding_service import (
    complete_onboarding
)

router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"]
)


@router.post("/complete")
def onboarding_complete(
    onboarding_data: OnboardingRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    updated_user = complete_onboarding(
        db,
        current_user,
        onboarding_data
    )

    if not updated_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid role selected"
        )

    return {
        "message": (
            "Onboarding completed successfully"
        ),
        "requested_role": (
            updated_user.requested_role
        ),
        "status": updated_user.status
    }