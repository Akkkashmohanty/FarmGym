from sqlalchemy.orm import Session

from app.models.user_model import User

from app.schemas.onboarding_schema import (
    OnboardingRequest
)


ALLOWED_ROLES = [
    "farmer",
    "ngo",
    "vendor",
    "trainer",
    "volunteer"
]


def complete_onboarding(
    db: Session,
    current_user: User,
    onboarding_data: OnboardingRequest
):

    if onboarding_data.requested_role not in ALLOWED_ROLES:
        return None

    current_user.requested_role = (
        onboarding_data.requested_role
    )

    db.commit()

    db.refresh(current_user)

    return current_user