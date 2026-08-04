from fastapi import HTTPException, UploadFile, status

from app.models.community import CommunityPost
from app.repositories.community_repository import CommunityRepository
from app.schemas.community import (
    CommunityPostCreate,
    CommunityPostUpdate,
)
from app.services.activity_service import ActivityService
from app.services.notification_service import NotificationService
from app.services.storage_service import StorageService


class CommunityService:
    def __init__(
        self,
        repository: CommunityRepository,
        storage_service: StorageService,
        activity_service: ActivityService,
        notification_service: NotificationService,
    ):
        self.repository = repository
        self.storage_service = storage_service
        self.activity_service = activity_service
        self.notification_service = notification_service

    # ----------------------------------------------------
    # POSTS
    # ----------------------------------------------------

    def create_post(
        self,
        *,
        user_id: int,
        payload: CommunityPostCreate,
        image: UploadFile | None = None,
    ):

        image_url = None

        if image:

            allowed_types = {
                "image/jpeg",
                "image/png",
                "image/webp",
            }

            if image.content_type not in allowed_types:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Only JPG, PNG and WEBP images are allowed.",
                )

            contents = image.file.read()

            if len(contents) > 5 * 1024 * 1024:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Image size must not exceed 5 MB.",
                )

            image.file.seek(0)

            image_url = self.storage_service.upload_community_image(
                image,
            )

        post = CommunityPost(
            user_id=user_id,
            title=payload.title.strip(),
            description=payload.description.strip(),
            crop=payload.crop,
            state=payload.state,
            tags=payload.tags,
            challenge_id=payload.challenge_id,
            image_url=image_url,
        )

        post = self.repository.create_post(post)

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_POST_CREATED",
            description=f"Created community post #{post.id}",
        )

        self.notification_service.notify(
            user_id=user_id,
            title="Community",
            message="Your post has been published.",
        )

        return post

    def list_posts(
        self,
        *,
        search: str | None = None,
        crop: str | None = None,
        state: str | None = None,
        page: int = 1,
        limit: int = 10,
    ):

        if page < 1:
            page = 1

        if limit < 1:
            limit = 10

        if limit > 100:
            limit = 100

        return self.repository.list_posts(
            search=search,
            crop=crop,
            state=state,
            page=page,
            limit=limit,
        )

    def get_post(
        self,
        post_id: int,
    ):

        post = self.repository.get_post(post_id)

        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Community post not found.",
            )

        return post

    def update_post(
        self,
        *,
        post_id: int,
        user_id: int,
        payload: CommunityPostUpdate,
        image: UploadFile | None = None,
    ):

        post = self.get_post(post_id)

        if post.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to update this post.",
            )

        data = payload.model_dump(
            exclude_unset=True,
        )

        if image:

            allowed_types = {
                "image/jpeg",
                "image/png",
                "image/webp",
            }

            if image.content_type not in allowed_types:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Only JPG, PNG and WEBP images are allowed.",
                )

            contents = image.file.read()

            if len(contents) > 5 * 1024 * 1024:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Image size must not exceed 5 MB.",
                )

            image.file.seek(0)

            if post.image_url:
                self.storage_service.delete_image(
                    post.image_url,
                )

            data["image_url"] = (
                self.storage_service.upload_community_image(
                    image,
                )
            )

        for key, value in data.items():
            setattr(post, key, value)

        post = self.repository.save_post(post)

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_POST_UPDATED",
            description=f"Updated community post #{post.id}",
        )

        return post

    def delete_post(
        self,
        *,
        post_id: int,
        user_id: int,
    ):

        post = self.get_post(post_id)

        if post.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to delete this post.",
            )

        if post.image_url:
            self.storage_service.delete_image(
                post.image_url,
            )

        self.repository.delete_post(post)

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_POST_DELETED",
            description=f"Deleted community post #{post.id}",
        )

        return {
            "message": "Community post deleted successfully."
        }

    # ----------------------------------------------------
    # LIKES
    # ----------------------------------------------------

    def like_post(
        self,
        *,
        post_id: int,
        user_id: int,
    ):

        post = self.get_post(post_id)

        existing = self.repository.get_like(
            post_id,
            user_id,
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already liked this post.",
            )

        from app.models.community import CommunityLike

        like = CommunityLike(
            post_id=post.id,
            user_id=user_id,
        )

        self.repository.create_like(
            like,
            commit=False,
        )

        post.likes_count += 1

        self.repository.save_post(
            post,
            commit=False,
        )

        self.repository.db.commit()
        self.repository.db.refresh(post)

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_POST_LIKED",
            description=f"Liked community post #{post.id}",
        )

        return {
            "message": "Post liked successfully.",
            "likes_count": post.likes_count,
        }

    def unlike_post(
        self,
        *,
        post_id: int,
        user_id: int,
    ):

        post = self.get_post(post_id)

        like = self.repository.get_like(
            post_id,
            user_id,
        )

        if not like:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Like not found.",
            )

        self.repository.delete_like(
            like,
            commit=False,
        )

        if post.likes_count > 0:
            post.likes_count -= 1

        self.repository.save_post(
            post,
            commit=False,
        )

        self.repository.db.commit()
        self.repository.db.refresh(post)

        return {
            "message": "Like removed successfully.",
            "likes_count": post.likes_count,
        }

    # ----------------------------------------------------
    # COMMENTS
    # ----------------------------------------------------

    def add_comment(
        self,
        *,
        post_id: int,
        user_id: int,
        content: str,
    ):

        post = self.get_post(post_id)

        content = content.strip()

        if not content:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Comment cannot be empty.",
            )

        from app.models.community import CommunityComment

        comment = CommunityComment(
            post_id=post.id,
            user_id=user_id,
            content=content,
        )

        self.repository.create_comment(
            comment,
            commit=False,
        )

        post.comments_count += 1

        self.repository.save_post(
            post,
            commit=False,
        )

        self.repository.db.commit()
        self.repository.db.refresh(comment)
        self.repository.db.refresh(post)

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_COMMENT_CREATED",
            description=f"Commented on post #{post.id}",
        )

        self.notification_service.notify(
            user_id=post.user_id,
            title="New Comment",
            message="Someone commented on your post.",
        )

        return comment

    def list_comments(
        self,
        *,
        post_id: int,
    ):

        self.get_post(post_id)

        return self.repository.get_comments(
            post_id,
        )

    def delete_comment(
        self,
        *,
        comment_id: int,
        user_id: int,
    ):

        comment = self.repository.get_comment(
            comment_id,
        )

        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found.",
            )

        if comment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not allowed to delete this comment.",
            )

        post = self.get_post(comment.post_id)

        self.repository.delete_comment(
            comment,
            commit=False,
        )

        if post.comments_count > 0:
            post.comments_count -= 1

        self.repository.save_post(
            post,
            commit=False,
        )

        self.repository.db.commit()

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_COMMENT_DELETED",
            description=f"Deleted comment from post #{post.id}",
        )

        return {
            "message": "Comment deleted successfully."
        }

    # ----------------------------------------------------
    # CHALLENGES
    # ----------------------------------------------------

    def list_challenges(self):
        return self.repository.list_challenges()

    def join_challenge(
        self,
        *,
        challenge_id: int,
        user_id: int,
    ):

        challenge = self.repository.get_challenge(
            challenge_id,
        )

        if not challenge:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Challenge not found.",
            )

        participant = self.repository.get_participant(
            challenge_id,
            user_id,
        )

        if participant:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already joined this challenge.",
            )

        from app.models.community import (
            CommunityChallengeParticipant,
        )

        participant = CommunityChallengeParticipant(
            challenge_id=challenge_id,
            user_id=user_id,
        )

        self.repository.join_challenge(
            participant,
        )

        self.activity_service.log(
            user_id=user_id,
            action="COMMUNITY_CHALLENGE_JOINED",
            description=f"Joined challenge #{challenge.id}",
        )

        self.notification_service.notify(
            user_id=user_id,
            title="Challenge Joined",
            message=f"You joined '{challenge.title}'.",
        )

        return participant

    # ----------------------------------------------------
    # LEADERBOARD
    # ----------------------------------------------------

    def leaderboard(
        self,
        limit: int = 20,
    ):

        if limit < 1:
            limit = 20

        if limit > 100:
            limit = 100

        return self.repository.leaderboard(
            limit=limit,
        )

    