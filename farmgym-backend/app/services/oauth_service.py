from google.oauth2 import id_token
from google.auth.transport import requests

from sqlalchemy.orm import Session

from app.models.user_model import User

from app.core.security import create_access_token

from dotenv import load_dotenv

import os

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv(
    "GOOGLE_CLIENT_ID"
)


def google_login_service(
    token: str,
    db: Session
):

    try:

        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]

        full_name = idinfo.get(
            "name",
            "Google User"
        )

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:

            user = User(
                full_name=full_name,
                email=email,
                password="GOOGLE_AUTH",
                role="user"
            )

            db.add(user)

            db.commit()

            db.refresh(user)

        access_token = create_access_token(
            data={
                "sub": user.email
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email
            }
        }

    except Exception:
        return None