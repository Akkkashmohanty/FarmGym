from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.db.database import Base


class FarmerProfile(Base):

    __tablename__ = "farmer_profiles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    city = Column(String)

    state = Column(String)

    farming_type = Column(String)

    balcony_size = Column(String)

    experience_level = Column(String)

    preferred_crops = Column(String)

    profile_image = Column(String, nullable=True)

    user = relationship("User")