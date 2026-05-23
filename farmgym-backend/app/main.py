from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.db.database import Base

from app.models.user_model import User


from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.oauth_routes import (
    router as oauth_router
)

from app.routes.user_routes import (
    router as user_router
)


app = FastAPI(
    title="FarmGym API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

app.include_router(oauth_router)

app.include_router(user_router)


@app.get("/")
def root():

    return {
        "message": "FarmGym Backend Running Successfully"
    }


    