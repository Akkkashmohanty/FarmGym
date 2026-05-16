from fastapi import FastAPI

from app.db.database import engine
from app.db.database import Base

from app.models.user_model import User

from app.routes.auth_routes import router as auth_router

app = FastAPI(
    title="FarmGym API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)


@app.get("/")
def root():

    return {
        "message": "FarmGym Backend Running Successfully"
    }

    