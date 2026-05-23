from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer

from jose import jwt
from jose import JWTError

from sqlalchemy.orm import Session

from dotenv import load_dotenv

import os

from app.db.database import get_db

from app.models.user_model import User

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid authentication credentials"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        raise credentials_exception

    return user


def get_admin_user(
    current_user: User = Depends(
        get_current_user
    )
):

    if not current_user.is_admin:

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def get_approved_user(
    current_user: User = Depends(
        get_current_user
    )
):

    if current_user.status != "approved":

        raise HTTPException(
            status_code=403,
            detail="Your account is not approved yet"
        )

    return current_user

    