from sqlalchemy.orm import Session, joinedload

from app.models.video import (
    Video,
    VideoComment,
    VideoLike,
    Playlist,
    PlaylistVideo,
    VideoProgress,
)


class VideoRepository:
    def __init__(self, db: Session):
        self.db = db

    # ------------------------
    # VIDEOS
    # ------------------------

    def create_video(self, video: Video):
        self.db.add(video)
        self.db.commit()
        self.db.refresh(video)
        return video

    def save_video(self, video: Video):
        self.db.commit()
        self.db.refresh(video)
        return video

    def get_video(self, video_id: int):
        return (
            self.db.query(Video)
            .options(joinedload(Video.creator))
            .filter(Video.id == video_id)
            .first()
        )

    def list_videos(self):
        return (
            self.db.query(Video)
            .options(joinedload(Video.creator))
            .filter(Video.is_published.is_(True))
            .order_by(Video.created_at.desc())
            .all()
        )

    def delete_video(self, video: Video):
        self.db.delete(video)
        self.db.commit()

    # ------------------------
    # COMMENTS
    # ------------------------

    def create_comment(self, comment: VideoComment):
        self.db.add(comment)
        self.db.commit()
        self.db.refresh(comment)
        return comment

    def list_comments(self, video_id: int):
        return (
            self.db.query(VideoComment)
            .options(joinedload(VideoComment.user))
            .filter(VideoComment.video_id == video_id)
            .order_by(VideoComment.created_at.asc())
            .all()
        )

    def get_comment(self, comment_id: int):
        return (
            self.db.query(VideoComment)
            .filter(VideoComment.id == comment_id)
            .first()
        )

    def delete_comment(self, comment: VideoComment):
        self.db.delete(comment)
        self.db.commit()

    # ------------------------
    # LIKES
    # ------------------------

    def get_like(self, video_id: int, user_id: int):
        return (
            self.db.query(VideoLike)
            .filter(
                VideoLike.video_id == video_id,
                VideoLike.user_id == user_id,
            )
            .first()
        )

    def create_like(self, like: VideoLike):
        self.db.add(like)
        self.db.commit()
        self.db.refresh(like)
        return like

    def delete_like(self, like: VideoLike):
        self.db.delete(like)
        self.db.commit()

    # ------------------------
    # PLAYLISTS
    # ------------------------

    def create_playlist(self, playlist: Playlist):
        self.db.add(playlist)
        self.db.commit()
        self.db.refresh(playlist)
        return playlist

    def get_playlist(self, playlist_id: int):
        return (
            self.db.query(Playlist)
            .options(joinedload(Playlist.videos))
            .filter(Playlist.id == playlist_id)
            .first()
        )

    def list_playlists(self, user_id: int):
        return (
            self.db.query(Playlist)
            .filter(Playlist.user_id == user_id)
            .all()
        )

    def add_video_to_playlist(
        self,
        playlist_video: PlaylistVideo,
    ):
        self.db.add(playlist_video)
        self.db.commit()
        self.db.refresh(playlist_video)
        return playlist_video

    # ------------------------
    # PROGRESS
    # ------------------------

    def get_progress(
        self,
        user_id: int,
        video_id: int,
    ):
        return (
            self.db.query(VideoProgress)
            .filter(
                VideoProgress.user_id == user_id,
                VideoProgress.video_id == video_id,
            )
            .first()
        )

    def save_progress(
        self,
        progress: VideoProgress,
    ):
        self.db.add(progress)
        self.db.commit()
        self.db.refresh(progress)
        return progress