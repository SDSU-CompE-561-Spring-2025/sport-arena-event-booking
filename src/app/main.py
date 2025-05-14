import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.user import router as user_router
from app.routes.venue import router as venue_router
from app.routes.venue_owner import router as venue_owner_router
from app.routes.bookings import router as bookings_router
from app.core.database import Base, engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(venue_router, prefix="/venue", tags=["venue"])
app.include_router(venue_owner_router, prefix="/venue_owner", tags=["venue_owner"])
app.include_router(bookings_router, prefix="/bookings", tags=["bookings"])

UPLOADS_PATH = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs("uploads", exist_ok=True)


Base.metadata.create_all(bind=engine)
