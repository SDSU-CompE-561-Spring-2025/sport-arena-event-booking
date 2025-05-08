from fastapi import FastAPI
from app.routes.user import router as user_router
from app.routes.venue import router as venue_router
from app.routes.venue_owner import router as venue_owner_router
from app.routes.bookings import router as bookings_router
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app import models  
from sqlalchemy import create_engine


app = FastAPI(debug=True)

app.include_router(venue_router, prefix='/venue', tags=['venue'])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(venue_owner_router, prefix="/venue_owner", tags=["venue_owner"])
app.include_router(bookings_router, prefix="/bookings", tags=["bookings"])

# from sqlalchemy.orm import declarative_base

# Base = declarative_base()
engine = create_engine("sqlite:///./test.db")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Root route 
@app.get("/") 
def read_root(): 
    return {"message": "Welcome to the Sport Arena Event Booking API!"}