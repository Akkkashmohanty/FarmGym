from sqlalchemy.orm import Session

from app.models.farmer_model import FarmerProfile

from app.schemas.farmer_schema import (
    FarmerProfileCreate
)

from app.models.user_model import User


def create_farmer_profile(
    db: Session,
    farmer_data: FarmerProfileCreate,
    current_user: User
):

    existing_profile = db.query(
        FarmerProfile
    ).filter(
        FarmerProfile.user_id == current_user.id
    ).first()

    if existing_profile:
        return None

    farmer_profile = FarmerProfile(
        user_id=current_user.id,
        city=farmer_data.city,
        state=farmer_data.state,
        farming_type=farmer_data.farming_type,
        balcony_size=farmer_data.balcony_size,
        experience_level=farmer_data.experience_level,
        preferred_crops=farmer_data.preferred_crops
    )

    db.add(farmer_profile)

    db.commit()

    db.refresh(farmer_profile)

    return farmer_profile