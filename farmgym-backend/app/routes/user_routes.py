from fastapi import APIRouter
from fastapi import Depends

from app.utils.auth_dependencies import (
    get_current_user
)

from app.models.user_model import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role
    }

    