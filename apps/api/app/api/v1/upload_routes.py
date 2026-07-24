from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.storage_service import StorageService

router = APIRouter(
    prefix="/uploads",
    tags=["Uploads"],
)

storage = StorageService()

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
}


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed.",
        )

    image_url = storage.upload_product_image(file)

    return {
        "image_url": image_url,
    }