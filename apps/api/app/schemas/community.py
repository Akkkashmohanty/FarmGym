from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# ------------------------
# Community Posts
# ------------------------

class CommunityPostCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=5)
    crop: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    challenge_id: Optional[int] = None


class CommunityPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=200)
    description: Optional[str] = None
    crop: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    challenge_id: Optional[int] = None
    is_active: Optional[bool] = None


class CommunityUserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str


class CommunityPostResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int

    title: str
    description: str

    image_url: Optional[str]

    crop: Optional[str]
    state: Optional[str]
    tags: Optional[str]

    challenge_id: Optional[int]

    likes_count: int
    comments_count: int

    is_liked: bool = False

    is_active: bool

    created_at: datetime
    updated_at: datetime

    user: CommunityUserResponse


# ------------------------
# Comments
# ------------------------

class CommunityCommentCreate(BaseModel):
    post_id: int
    parent_id: Optional[int] = None
    content: str = Field(..., min_length=1)


class CommunityCommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    post_id: int
    user_id: int
    parent_id: Optional[int]

    content: str

    created_at: datetime
    updated_at: datetime

    user: CommunityUserResponse


# ------------------------
# Challenge
# ------------------------

class CommunityChallengeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    banner_url: Optional[str]
    reward_badge: Optional[str]

    starts_at: datetime
    ends_at: datetime

    is_active: bool


# ------------------------
# Leaderboard
# ------------------------

class CommunityLeaderboardItem(BaseModel):
    user_id: int
    full_name: str
    xp_points: int
    total_posts: int
    total_likes: int