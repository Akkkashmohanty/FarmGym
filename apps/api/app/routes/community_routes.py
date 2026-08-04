from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    Query,
    UploadFile,
    status,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.api.dependencies import get_current_user

from app.models.user import User

from app.repositories.community_repository import (
    CommunityRepository,
)

from app.schemas.community import (
    CommunityPostCreate,
    CommunityPostUpdate,
    CommunityPostResponse,
    CommunityCommentCreate,
    CommunityCommentResponse,
    CommunityChallengeResponse,
)

from app.services.community_service import (
    CommunityService,
)

from app.services.storage_service import (
    StorageService,
)

from app.services.activity_service import (
    ActivityService,
)

from app.services.notification_service import (
    NotificationService,
)

router = APIRouter(
    prefix="/community",
    tags=["Community"],
)


def get_service(
    db: Session = Depends(get_db),
):

    repository = CommunityRepository(db)

    return CommunityService(
        repository=repository,
        storage_service=StorageService(),
        activity_service=ActivityService(db),
        notification_service=NotificationService(db),
    )


@router.get(
    "/posts",
    response_model=list[CommunityPostResponse],
)
def list_posts(
    search: str | None = Query(None),
    crop: str | None = Query(None),
    state: str | None = Query(None),
    page: int = Query(1),
    limit: int = Query(10),
    service: CommunityService = Depends(get_service),
):

    return service.list_posts(
        search=search,
        crop=crop,
        state=state,
        page=page,
        limit=limit,
    )


@router.get(
    "/posts/{post_id}",
    response_model=CommunityPostResponse,
)
def get_post(
    post_id: int,
    service: CommunityService = Depends(get_service),
):

    return service.get_post(
        post_id,
    )


@router.post(
    "/posts",
    response_model=CommunityPostResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_post(
    title: str = Form(...),
    description: str = Form(...),
    crop: str | None = Form(None),
    state: str | None = Form(None),
    tags: str | None = Form(None),
    challenge_id: int | None = Form(None),
    image: UploadFile | None = File(None),
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):

    payload = CommunityPostCreate(
        title=title,
        description=description,
        crop=crop,
        state=state,
        tags=tags,
        challenge_id=challenge_id,
    )

    return service.create_post(
        user_id=current_user.id,
        payload=payload,
        image=image,
    )


@router.patch(
    "/posts/{post_id}",
    response_model=CommunityPostResponse,
)
def update_post(
    post_id: int,
    title: str | None = Form(None),
    description: str | None = Form(None),
    crop: str | None = Form(None),
    state: str | None = Form(None),
    tags: str | None = Form(None),
    challenge_id: int | None = Form(None),
    image: UploadFile | None = File(None),
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    payload = CommunityPostUpdate(
        title=title,
        description=description,
        crop=crop,
        state=state,
        tags=tags,
        challenge_id=challenge_id,
    )

    return service.update_post(
        post_id=post_id,
        user_id=current_user.id,
        payload=payload,
        image=image,
    )


@router.delete(
    "/posts/{post_id}",
)
def delete_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.delete_post(
        post_id=post_id,
        user_id=current_user.id,
    )


@router.get(
    "/posts/{post_id}/comments",
    response_model=list[CommunityCommentResponse],
)
def list_comments(
    post_id: int,
    service: CommunityService = Depends(get_service),
):
    return service.list_comments(
        post_id=post_id,
    )


@router.post(
    "/posts/{post_id}/comments",
    response_model=CommunityCommentResponse,
)
def create_comment(
    post_id: int,
    payload: CommunityCommentCreate,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.add_comment(
        post_id=post_id,
        user_id=current_user.id,
        content=payload.content,
    )


@router.delete(
    "/comments/{comment_id}",
)
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.delete_comment(
        comment_id=comment_id,
        user_id=current_user.id,
    )


@router.post("/posts/{post_id}/like")
def like_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.like_post(
        post_id=post_id,
        user_id=current_user.id,
    )


@router.delete("/posts/{post_id}/like")
def unlike_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.unlike_post(
        post_id=post_id,
        user_id=current_user.id,
    )


@router.get(
    "/challenges",
    response_model=list[CommunityChallengeResponse],
)
def list_challenges(
    service: CommunityService = Depends(get_service),
):
    return service.list_challenges()


@router.post("/challenges/{challenge_id}/join")
def join_challenge(
    challenge_id: int,
    current_user: User = Depends(get_current_user),
    service: CommunityService = Depends(get_service),
):
    return service.join_challenge(
        challenge_id=challenge_id,
        user_id=current_user.id,
    )


@router.get("/leaderboard")
def leaderboard(
    service: CommunityService = Depends(get_service),
):
    return service.leaderboard()
