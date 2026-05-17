from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.farmer_schema import (
    FarmerProfileCreate,
    FarmerProfileResponse
)

from app.services.farmer_service import (
    create_farmer_profile
)

from app.utils.auth_dependencies import (
    get_current_user
)

from app.models.user_model import User

router = APIRouter(
    prefix="/farmers",
    tags=["Farmers"]
)


@router.post(
    "/onboard",
    response_model=FarmerProfileResponse
)
def onboard_farmer(
    farmer_data: FarmerProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    farmer_profile = create_farmer_profile(
        db,
        farmer_data,
        current_user
    )

    if not farmer_profile:
        raise HTTPException(
            status_code=400,
            detail="Farmer profile already exists"
        )

    return farmer_profile