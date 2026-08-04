from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.database import Base


class Video(Base):
    __tablename__ = "videos"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    creator_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    video_url: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    thumbnail_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    category: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    duration_seconds: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    views: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    likes_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    comments_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    creator = relationship("User")

    comments = relationship(
        "VideoComment",
        cascade="all, delete-orphan",
        back_populates="video",
    )

    likes = relationship(
        "VideoLike",
        cascade="all, delete-orphan",
        back_populates="video",
    )

    progress = relationship(
        "VideoProgress",
        cascade="all, delete-orphan",
        back_populates="video",
    )


class VideoComment(Base):
    __tablename__ = "video_comments"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    video_id: Mapped[int] = mapped_column(
        ForeignKey("videos.id"),
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    content: Mapped[str] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    video = relationship(
        "Video",
        back_populates="comments",
    )

    user = relationship("User")


class VideoLike(Base):
    __tablename__ = "video_likes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    video_id: Mapped[int] = mapped_column(
        ForeignKey("videos.id"),
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    video = relationship(
        "Video",
        back_populates="likes",
    )

    user = relationship("User")


class Playlist(Base):
    __tablename__ = "playlists"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    title: Mapped[str] = mapped_column(
        String(200),
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship("User")

    videos = relationship(
        "PlaylistVideo",
        cascade="all, delete-orphan",
        back_populates="playlist",
    )


class PlaylistVideo(Base):
    __tablename__ = "playlist_videos"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    playlist_id: Mapped[int] = mapped_column(
        ForeignKey("playlists.id"),
    )

    video_id: Mapped[int] = mapped_column(
        ForeignKey("videos.id"),
    )

    playlist = relationship(
        "Playlist",
        back_populates="videos",
    )

    video = relationship("Video")


class VideoProgress(Base):
    __tablename__ = "video_progress"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    video_id: Mapped[int] = mapped_column(
        ForeignKey("videos.id"),
    )

    watched_seconds: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user = relationship("User")

    video = relationship(
        "Video",
        back_populates="progress",
    )