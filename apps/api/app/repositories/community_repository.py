from sqlalchemy import or_
from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.community import (
    CommunityPost,
    CommunityComment,
    CommunityLike,
    CommunityChallenge,
    CommunityChallengeParticipant,
)


class CommunityRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # --------------------------------------------------
    # POSTS
    # --------------------------------------------------

    def create_post(
        self,
        post: CommunityPost,
        commit: bool = True,
    ) -> CommunityPost:
        self.db.add(post)

        if commit:
            self.db.commit()
            self.db.refresh(post)

        return post

    def save_post(
        self,
        post: CommunityPost,
        commit: bool = True,
    ) -> CommunityPost:

        if commit:
            self.db.commit()
            self.db.refresh(post)

        return post

    def get_post(
        self,
        post_id: int,
    ) -> CommunityPost | None:

        return (
            self.db.query(CommunityPost)
            .options(
                joinedload(CommunityPost.user),
                joinedload(CommunityPost.challenge),
            )
            .filter(
                CommunityPost.id == post_id,
                CommunityPost.is_active.is_(True),
            )
            .first()
        )

    def list_posts(
        self,
        *,
        search: str | None = None,
        crop: str | None = None,
        state: str | None = None,
        page: int = 1,
        limit: int = 10,
    ):

        query = (
            self.db.query(CommunityPost)
            .options(
                joinedload(CommunityPost.user),
                joinedload(CommunityPost.challenge),
            )
            .filter(
                CommunityPost.is_active.is_(True),
            )
        )

        if search:
            query = query.filter(
                or_(
                    CommunityPost.title.ilike(f"%{search}%"),
                    CommunityPost.description.ilike(f"%{search}%"),
                )
            )

        if crop:
            query = query.filter(
                CommunityPost.crop == crop,
            )

        if state:
            query = query.filter(
                CommunityPost.state == state,
            )

        return (
            query.order_by(
                CommunityPost.created_at.desc(),
            )
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

    def delete_post(
        self,
        post: CommunityPost,
        commit: bool = True,
    ):

        post.is_active = False

        if commit:
            self.db.commit()
            self.db.refresh(post)

        return post


        # --------------------------------------------------
    # COMMENTS
    # --------------------------------------------------

    def create_comment(
        self,
        comment: CommunityComment,
        commit: bool =True,
    ) -> CommunityComment:

        self.db.add(comment)

        if commit:
            self.db.commit()
            self.db.refresh(comment)

        return comment

    def get_comments(
        self,
        post_id: int,
    ) -> list[CommunityComment]:

        return (
            self.db.query(CommunityComment)
            .options(
                joinedload(CommunityComment.user),
            )
            .filter(
                CommunityComment.post_id == post_id,
            )
            .order_by(
                CommunityComment.created_at.asc(),
            )
            .all()
        )

    def get_comment(
        self,
        comment_id: int,
    ) -> CommunityComment | None:

        return (
            self.db.query(CommunityComment)
            .filter(
                CommunityComment.id == comment_id,
            )
            .first()
        )

    def delete_comment(
        self,
        comment: CommunityComment,
        commit: bool = True,
    ):

        self.db.delete(comment)

        if commit:
            self.db.commit()

    # --------------------------------------------------
    # LIKES
    # --------------------------------------------------

    def get_like(
        self,
        post_id: int,
        user_id: int,
    ) -> CommunityLike | None:

        return (
            self.db.query(CommunityLike)
            .filter(
                CommunityLike.post_id == post_id,
                CommunityLike.user_id == user_id,
            )
            .first()
        )

    def create_like(
        self,
        like: CommunityLike,
        commit: bool = True,
    ) -> CommunityLike:

        self.db.add(like)

        if commit:
            self.db.commit()
            self.db.refresh(like)

        return like

    def delete_like(
        self,
        like: CommunityLike,
        commit: bool = True,
    ):

        self.db.delete(like)

        if commit:
            self.db.commit()

    # --------------------------------------------------
    # CHALLENGES
    # --------------------------------------------------

    def list_challenges(
        self,
    ) -> list[CommunityChallenge]:

        return (
            self.db.query(CommunityChallenge)
            .filter(
                CommunityChallenge.is_active.is_(True),
            )
            .order_by(
                CommunityChallenge.starts_at.desc(),
            )
            .all()
        )

    def get_challenge(
        self,
        challenge_id: int,
    ) -> CommunityChallenge | None:

        return (
            self.db.query(CommunityChallenge)
            .filter(
                CommunityChallenge.id == challenge_id,
            )
            .first()
        )

    def join_challenge(
        self,
        participant: CommunityChallengeParticipant,
        commit: bool = True,
    ):

        self.db.add(participant)

        if commit:
            self.db.commit()
            self.db.refresh(participant)

        return participant

    def get_participant(
        self,
        challenge_id: int,
        user_id: int,
    ):

        return (
            self.db.query(CommunityChallengeParticipant)
            .filter(
                CommunityChallengeParticipant.challenge_id == challenge_id,
                CommunityChallengeParticipant.user_id == user_id,
            )
            .first()
        )

    # --------------------------------------------------
    # LEADERBOARD
    # --------------------------------------------------

    def leaderboard(
        self,
        limit: int = 20,
    ):

        return (
            self.db.query(CommunityPost)
            .options(
                joinedload(CommunityPost.user),
            )
            .filter(
                CommunityPost.is_active.is_(True),
            )
            .order_by(
                CommunityPost.likes_count.desc(),
                CommunityPost.comments_count.desc(),
            )
            .limit(limit)
            .all()
        )

    # --------------------------------------------------
    # UTILITIES
    # --------------------------------------------------

    def flush(
        self,
    ):
        self.db.flush()