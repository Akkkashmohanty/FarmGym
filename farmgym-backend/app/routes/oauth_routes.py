from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.db.database import get_db

from app.services.oauth_service import (
    google_login_service
)

router = APIRouter(
    prefix="/auth",
    tags=["OAuth"]
)


class GoogleToken(BaseModel):
    token: str


@router.post("/google")
def google_login(
    payload: GoogleToken,
    db: Session = Depends(get_db)
):

    result = google_login_service(
        payload.token,
        db
    )

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token"
        )

    return result