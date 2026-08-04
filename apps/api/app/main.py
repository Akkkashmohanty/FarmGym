from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router
from app.api.v1.auth_routes import router as auth_router
from app.api.v1.task_routes import router as task_router
from app.api.v1.dashboard_routes import router as dashboard_router
from app.api.v1.activity_routes import router as activity_router
from app.api.v1.notification_routes import (
    router as notification_router,
)
from app.api.v1.analytics_routes import (
    router as analytics_router,
)

from app.api.v1.achievement_routes import (
    router as achievement_router,
)

from app.api.v1.product_routes import (
    router as product_router,
)

from app.api.v1.order_routes import (
    router as order_router,
)

from app.api.v1.marketplace_routes import (
    router as marketplace_router,
)

from app.api.v1.farm_plan_routes import (
    router as farm_plan_router,
)

from app.api.v1.crop_routes import (
    router as crop_router,
)

from app.api.v1.farm_intelligence_routes import (
    router as farm_intelligence_router,
)

from app.api.v1.weather_routes import (
    router as weather_router,
)

from app.api.v1.farm_plan_generator_routes import (
    router as farm_plan_generator_router,
)

from app.api.v1.ai_routes import (
    router as ai_router,
)

from app.api.v1.user_farm_activity_routes import (
    router as user_farm_activity_router,
)

from app.api.v1.upload_routes import (
    router as upload_router,
)

from app.routes.community_routes import (
    router as community_router,
)

from app.api.v1.video_routes import (
    router as video_router,
)

from app.api.v1.admin_routes import (
    router as admin_router,
)

app = FastAPI(
    title="FarmGym API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix="/api/v1",
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    task_router,
    prefix="/api/v1",
)

app.include_router(
    dashboard_router,
    prefix="/api/v1",
)

app.include_router(
    activity_router,
    prefix="/api/v1",
)

app.include_router(
    notification_router,
    prefix="/api/v1",
)

app.include_router(
    analytics_router,
    prefix="/api/v1",
)

app.include_router(
    achievement_router,
    prefix="/api/v1",
)

app.include_router(
    product_router,
    prefix="/api/v1",
)

app.include_router(
    order_router,
    prefix="/api/v1",
)

app.include_router(
    marketplace_router,
    prefix="/api/v1",
)

app.include_router(
    farm_plan_router,
    prefix="/api/v1",
)

app.include_router(
    crop_router,
    prefix="/api/v1",
)

app.include_router(
    farm_intelligence_router,
    prefix="/api/v1",
)

app.include_router(
    weather_router,
    prefix="/api/v1",
)

app.include_router(
    farm_plan_generator_router,
    prefix="/api/v1",
)

app.include_router(
    ai_router,
    prefix="/api/v1",
)

app.include_router(
    user_farm_activity_router,
    prefix="/api/v1",
)

app.include_router(
    upload_router,
    prefix="/api/v1",
)

app.include_router(
    community_router,
    prefix="/api/v1",
)

app.include_router(
    video_router,
    prefix="/api/v1",
)

app.include_router(
    admin_router,
    prefix="/api/v1",
)

@app.get("/")
def root():
    return {
        "message": "FarmGym API Running",
    }
    