from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from app.db.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        default="pending"
    )

    requested_role = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        default="pending"
    )

    is_active = Column(
        Boolean,
        default=True
    )

    is_admin = Column(
        Boolean,
        default=False
    )