from google.oauth2 import id_token
from google.auth.transport import requests

from sqlalchemy.orm import Session

from dotenv import load_dotenv

import os

from app.models.user_model import User

from app.core.security import (
    create_access_token
)

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
                role="pending",
                requested_role=None,
                status="pending",
                is_active=True,
                is_admin=False
            )

            db.add(user)

            db.commit()

            db.refresh(user)

        access_token = create_access_token(
            data={
                "sub": user.email,
                "role": user.role,
                "status": user.status,
                "is_admin": user.is_admin
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "role": user.role,
            "status": user.status,
            "requested_role": user.requested_role,
            "is_admin": user.is_admin,
            "onboarding_required": (
                user.requested_role is None
            )
        }

    except Exception:
        return None



        