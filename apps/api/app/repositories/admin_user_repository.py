from sqlalchemy.orm import Session

from app.models.user import User


class AdminUserRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def list_users(self):
        return (
            self.db.query(User)
            .order_by(User.created_at.desc())
            .all()
        )

    def get_user(
        self,
        user_id: int,
    ):
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    def save_user(
        self,
        user: User,
    ):
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_user(
        self,
        user: User,
    ):
        self.db.delete(user)
        self.db.commit()