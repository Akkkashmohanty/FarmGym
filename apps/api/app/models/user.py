from datetime import datetime
from enum import Enum

from sqlalchemy import (
    DateTime,
    Enum as SqlEnum,
    Integer,
    String,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base


class UserRole(str, Enum):
    USER = "USER"
    FARMER = "FARMER"
    SELLER = "SELLER"
    CREATOR = "CREATOR"
    ADMIN = "ADMIN"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )

    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    role: Mapped[UserRole] = mapped_column(
        SqlEnum(UserRole),
        default=UserRole.USER,
        nullable=False,
    )

    xp_points: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    level: Mapped[int] = mapped_column(
        Integer,
        default=1,
    )

    streak_days: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    orders = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    products = relationship(
        "Product",
        back_populates="seller",
        cascade="all, delete-orphan",
    )

    farm_plans = relationship(
        "FarmPlan",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    community_posts = relationship(
        "CommunityPost",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    community_comments = relationship(
        "CommunityComment",
        cascade="all, delete-orphan",
    )

    community_likes = relationship(
        "CommunityLike",
        cascade="all, delete-orphan",
    )

    community_challenges = relationship(
        "CommunityChallengeParticipant",
        cascade="all, delete-orphan",
    )

    farm_activity_logs = relationship(
        "UserFarmActivity",
        back_populates="user",
        cascade="all, delete-orphan",
    )