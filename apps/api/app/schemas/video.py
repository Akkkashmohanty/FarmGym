from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# ------------------------
# Video
# ------------------------

class VideoCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: str
    category: Optional[str] = None


class VideoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    is_published: Optional[bool] = None


class VideoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    creator_id: int

    title: str
    description: str

    video_url: str
    thumbnail_url: Optional[str]

    category: Optional[str]

    duration_seconds: int

    views: int
    likes_count: int
    comments_count: int

    is_published: bool

    created_at: datetime
    updated_at: datetime


# ------------------------
# Comments
# ------------------------

class VideoCommentCreate(BaseModel):
    content: str = Field(..., min_length=1)


class VideoCommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    video_id: int

    content: str

    created_at: datetime


# ------------------------
# Playlist
# ------------------------

class PlaylistCreate(BaseModel):
    title: str
    description: Optional[str] = None


class PlaylistResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int

    title: str
    description: Optional[str]

    created_at: datetime


# ------------------------
# Progress
# ------------------------

class VideoProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    video_id: int
    watched_seconds: int
    completed: bool