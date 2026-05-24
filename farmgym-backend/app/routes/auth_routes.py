from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.user_schema import (
    UserCreate,
    UserResponse
)

from app.schemas.auth_schema import (
    TokenSchema
)

from app.services.auth_service import (
    create_user,
    login_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    new_user = create_user(
        db,
        user
    )

    if not new_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return new_user


@router.post(
    "/login",
    response_model=TokenSchema
)
def login(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)

):

    token = login_user(
        db,
        form_data.username,
        form_data.password
    )

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token