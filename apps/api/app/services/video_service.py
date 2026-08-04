from fastapi import HTTPException, UploadFile, status

from app.models.video import (
    Video,
    VideoComment,
    VideoLike,
    Playlist,
    PlaylistVideo,
    VideoProgress,
)

from app.repositories.video_repository import VideoRepository
from app.schemas.video import (
    VideoCreate,
    VideoUpdate,
)


class VideoService:
    def __init__(self, repository):
        self.repository: VideoRepository = repository

    # -----------------------
    # VIDEOS
    # -----------------------

    def create_video(
        self,
        *,
        creator_id: int,
        payload: VideoCreate,
        video_url: str,
        thumbnail_url: str | None = None,
    ):
        video = Video(
            creator_id=creator_id,
            title=payload.title,
            description=payload.description,
            category=payload.category,
            video_url=video_url,
            thumbnail_url=thumbnail_url,
        )

        return self.repository.create_video(video)

    def list_videos(self):
        return self.repository.list_videos()

    def get_video(self, video_id: int):
        video = self.repository.get_video(video_id)

        if not video:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Video not found.",
            )

        return video

    def update_video(
        self,
        *,
        video_id: int,
        creator_id: int,
        payload: VideoUpdate,
    ):
        video = self.get_video(video_id)

        if video.creator_id != creator_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied.",
            )

        data = payload.model_dump(exclude_unset=True)

        for key, value in data.items():
            setattr(video, key, value)

        return self.repository.save_video(video)

    def delete_video(
        self,
        *,
        video_id: int,
        creator_id: int,
    ):
        video = self.get_video(video_id)

        if video.creator_id != creator_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied.",
            )

        self.repository.delete_video(video)

        return {
            "message": "Video deleted successfully."
        }

    # -----------------------
    # COMMENTS
    # -----------------------

    def add_comment(
        self,
        *,
        video_id: int,
        user_id: int,
        content: str,
    ):
        self.get_video(video_id)

        comment = VideoComment(
            video_id=video_id,
            user_id=user_id,
            content=content.strip(),
        )

        return self.repository.create_comment(comment)

    def list_comments(self, video_id: int):
        self.get_video(video_id)
        return self.repository.list_comments(video_id)

    def delete_comment(
        self,
        *,
        comment_id: int,
        user_id: int,
    ):
        comment = self.repository.get_comment(comment_id)

        if not comment:
            raise HTTPException(
                status_code=404,
                detail="Comment not found.",
            )

        if comment.user_id != user_id:
            raise HTTPException(
                status_code=403,
                detail="Permission denied.",
            )

        self.repository.delete_comment(comment)

        return {
            "message": "Comment deleted."
        }

    # -----------------------
    # LIKES
    # -----------------------

    def like_video(
        self,
        *,
        video_id: int,
        user_id: int,
    ):
        video = self.get_video(video_id)

        existing = self.repository.get_like(
            video_id,
            user_id,
        )

        if existing:
            return

        like = VideoLike(
            video_id=video_id,
            user_id=user_id,
        )

        self.repository.create_like(like)

        video.likes_count += 1

        self.repository.save_video(video)

    def unlike_video(
        self,
        *,
        video_id: int,
        user_id: int,
    ):
        video = self.get_video(video_id)

        like = self.repository.get_like(
            video_id,
            user_id,
        )

        if not like:
            return

        self.repository.delete_like(like)

        if video.likes_count > 0:
            video.likes_count -= 1

        self.repository.save_video(video)

    # -----------------------
    # PLAYLISTS
    # -----------------------

    def create_playlist(
        self,
        *,
        user_id: int,
        title: str,
        description: str | None,
    ):
        playlist = Playlist(
            user_id=user_id,
            title=title,
            description=description,
        )

        return self.repository.create_playlist(playlist)

    def add_video_to_playlist(
        self,
        *,
        playlist_id: int,
        video_id: int,
    ):
        playlist_video = PlaylistVideo(
            playlist_id=playlist_id,
            video_id=video_id,
        )

        return self.repository.add_video_to_playlist(
            playlist_video,
        )

    # -----------------------
    # WATCH PROGRESS
    # -----------------------

    def save_progress(
        self,
        *,
        user_id: int,
        video_id: int,
        watched_seconds: int,
    ):
        progress = self.repository.get_progress(
            user_id,
            video_id,
        )

        if progress is None:
            progress = VideoProgress(
                user_id=user_id,
                video_id=video_id,
            )

        progress.watched_seconds = watched_seconds

        if watched_seconds >= self.get_video(video_id).duration_seconds:
            progress.completed = True

        return self.repository.save_progress(progress)