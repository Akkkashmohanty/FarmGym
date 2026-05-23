from sqlalchemy.orm import Session

from app.models.user_model import User

from app.schemas.user_schema import UserCreate

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def create_user(
    db: Session,
    user: UserCreate
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return None

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_password,
        role="pending",
        status="pending"
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


def authenticate_user(
    db: Session,
    email: str,
    password: str
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    return user


def login_user(
    db: Session,
    email: str,
    password: str
):

    user = authenticate_user(
        db,
        email,
        password
    )

    if not user:
        return None

    token = create_access_token(
    data={
        "sub": user.email,
        "role": user.role,
        "status": user.status,
        "is_admin": user.is_admin
    }
)

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "status": user.status,
        "is_admin": user.is_admin
    }