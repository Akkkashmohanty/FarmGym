from fastapi import HTTPException, status

from app.models.user import UserRole

from app.repositories.admin_user_repository import (
    AdminUserRepository,
)


class AdminUserService:
    def __init__(
        self,
        repository: AdminUserRepository,
    ):
        self.repository = repository

    def list_users(self):
        return self.repository.list_users()

    def update_role(
        self,
        *,
        user_id: int,
        role: UserRole,
    ):
        user = self.repository.get_user(user_id)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        user.role = role

        return self.repository.save_user(user)

    def delete_user(
        self,
        user_id: int,
    ):
        user = self.repository.get_user(user_id)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        self.repository.delete_user(user)

        return {
            "message": "User deleted successfully."
        }