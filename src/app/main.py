from fastapi import FastAPI
from app.routes.user import router as user_router
from app.routes.venue import router as venue_router
from app.routes.venue_owner import router as venue_owner_router
from app.core.database import Base, engine


app = FastAPI(debug=True)
#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app.include_router(venue_router, prefix='/venue', tags=['venue'])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(venue_owner_router, prefix="/venue_owner", tags=["venue_owner"])

from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine("sqlite:///./test.db")  # Replace with your database URL

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello from Docker (fallback main)"}
