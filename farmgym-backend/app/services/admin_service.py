from sqlalchemy.orm import Session

from app.models.user_model import User


def get_pending_users(
    db: Session
):

    return db.query(User).filter(
        User.status == "pending",
        User.requested_role != None
    ).all()


def approve_user(
    db: Session,
    user_id: int
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return None

    user.role = user.requested_role

    user.status = "approved"

    db.commit()

    db.refresh(user)

    return user


def reject_user(
    db: Session,
    user_id: int
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return None

    user.status = "rejected"

    db.commit()

    db.refresh(user)

    return user