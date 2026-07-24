import uuid
from pathlib import Path

import boto3
from botocore.exceptions import ClientError

from app.core.config import settings


class StorageService:
    def __init__(self):
        self.bucket = settings.AWS_BUCKET_NAME

        self.client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
        )

    def upload_product_image(self, file):
        extension = Path(file.filename).suffix.lower()

        filename = f"products/{uuid.uuid4()}{extension}"

        self.client.upload_fileobj(
            file.file,
            self.bucket,
            filename,
            ExtraArgs={
                "ContentType": file.content_type,
            },
        )

        return (
            f"https://{self.bucket}.s3."
            f"{settings.AWS_REGION}.amazonaws.com/"
            f"{filename}"
        )

    def delete_image(self, key: str):
        try:
            self.client.delete_object(
                Bucket=self.bucket,
                Key=key,
            )
        except ClientError:
            pass