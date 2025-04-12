from fastapi import FastAPI
from app.routes.user import router as user_router
from app.core.database import Base, engine


app = FastAPI()
Base.metadata.create_all(bind=engine)

app.include_router(user_router, prefix="/user", tags=["user"])
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine("sqlite:///./test.db")  # Replace with your database URL

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello from Docker (fallback main)"}
