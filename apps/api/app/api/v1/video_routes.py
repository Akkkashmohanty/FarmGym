from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    Body,
)

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User

from app.repositories.video_repository import VideoRepository
from app.services.video_service import VideoService

from app.schemas.video import (
    VideoCreate,
    VideoUpdate,
    VideoResponse,
    VideoCommentResponse,
    PlaylistCreate,
    PlaylistResponse,
)


router = APIRouter(
    prefix="/videos",
    tags=["Learning"],
)


def get_service(
    db: Session = Depends(get_db),
):
    return VideoService(
        VideoRepository(db),
    )


# --------------------------------------------------
# VIDEOS
# --------------------------------------------------


@router.get(
    "",
    response_model=list[VideoResponse],
)
def list_videos(
    service: VideoService = Depends(get_service),
):
    return service.list_videos()


@router.get(
    "/{video_id}",
    response_model=VideoResponse,
)
def get_video(
    video_id: int,
    service: VideoService = Depends(get_service),
):
    return service.get_video(video_id)


@router.post(
    "",
    response_model=VideoResponse,
)
def upload_video(
    title: str = Form(...),
    description: str = Form(...),
    category: str | None = Form(None),
    video: UploadFile = File(...),
    thumbnail: UploadFile | None = File(None),
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    payload = VideoCreate(
        title=title,
        description=description,
        category=category,
    )

    video_url = f"/uploads/{video.filename}"

    thumbnail_url = (
        f"/uploads/{thumbnail.filename}"
        if thumbnail
        else None
    )

    return service.create_video(
        creator_id=current_user.id,
        payload=payload,
        video_url=video_url,
        thumbnail_url=thumbnail_url,
    )


@router.patch(
    "/{video_id}",
    response_model=VideoResponse,
)
def update_video(
    video_id: int,
    payload: VideoUpdate,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.update_video(
        video_id=video_id,
        creator_id=current_user.id,
        payload=payload,
    )


@router.delete(
    "/{video_id}",
)
def delete_video(
    video_id: int,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.delete_video(
        video_id=video_id,
        creator_id=current_user.id,
    )


# --------------------------------------------------
# LIKES
# --------------------------------------------------


@router.post(
    "/{video_id}/like",
)
def like_video(
    video_id: int,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    service.like_video(
        video_id=video_id,
        user_id=current_user.id,
    )

    return {
        "message": "Video liked."
    }


@router.delete(
    "/{video_id}/like",
)
def unlike_video(
    video_id: int,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    service.unlike_video(
        video_id=video_id,
        user_id=current_user.id,
    )

    return {
        "message": "Video unliked."
    }


# --------------------------------------------------
# COMMENTS
# --------------------------------------------------


@router.get(
    "/{video_id}/comments",
    response_model=list[VideoCommentResponse],
)
def list_comments(
    video_id: int,
    service: VideoService = Depends(get_service),
):
    return service.list_comments(video_id)


@router.post(
    "/{video_id}/comments",
    response_model=VideoCommentResponse,
)
def add_comment(
    video_id: int,
    payload: dict = Body(...),
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.add_comment(
        video_id=video_id,
        user_id=current_user.id,
        content=payload["content"],
    )


@router.delete(
    "/comments/{comment_id}",
)
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.delete_comment(
        comment_id=comment_id,
        user_id=current_user.id,
    )


# --------------------------------------------------
# PLAYLISTS
# --------------------------------------------------


@router.get(
    "/playlists",
    response_model=list[PlaylistResponse],
)
def list_playlists(
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.repository.list_playlists(
        current_user.id,
    )


@router.post(
    "/playlists",
    response_model=PlaylistResponse,
)
def create_playlist(
    payload: PlaylistCreate,
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.create_playlist(
        user_id=current_user.id,
        title=payload.title,
        description=payload.description,
    )


@router.post(
    "/playlists/{playlist_id}/videos/{video_id}",
)
def add_video_to_playlist(
    playlist_id: int,
    video_id: int,
    service: VideoService = Depends(get_service),
):
    return service.add_video_to_playlist(
        playlist_id=playlist_id,
        video_id=video_id,
    )


# --------------------------------------------------
# WATCH PROGRESS
# --------------------------------------------------


@router.post(
    "/{video_id}/progress",
)
def save_progress(
    video_id: int,
    watched_seconds: int = Body(embed=True),
    current_user: User = Depends(get_current_user),
    service: VideoService = Depends(get_service),
):
    return service.save_progress(
        user_id=current_user.id,
        video_id=video_id,
        watched_seconds=watched_seconds,
    )