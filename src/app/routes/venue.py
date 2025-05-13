from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
import os
import shutil
from uuid import uuid4
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.services.venue import *
from app.models.venue import Venue
from app.schemas.venue import VenueCreate, VenueUpdate, VenueResponse
from app.models.venue_hours import VenueHours
from app.schemas.venue_hours import VenueHoursCreate, VenueHoursResponse
from typing import List


router = APIRouter()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@router.get("/venues", response_model=List[VenueResponse])
def get_venues(db: Session = Depends(get_db)):
    return get_venues_service(db)

@router.get("/venues/{venue_id}", response_model=VenueResponse)
def get_venue(venue_id: int, db: Session = Depends(get_db)):
    return get_venue_by_venue_id_service(venue_id, db)

@router.get("/venue_hours/{venue_id}", response_model=List[VenueHoursResponse])
def get_venue_hours(venue_id: int, db: Session = Depends(get_db)):
    return get_venue_hours_by_venue_id_service(venue_id, db)

@router.post("/create", response_model=VenueResponse)
async def create_venue_route(
    name: str = Form(...),
    location: str = Form(...),
    capacity: int = Form(...),
    event_type: str = Form(...),
    venue_id: str = Form(...),
    availability: bool = Form(...),
    hourly_rate: float = Form(...),
    contact_info: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    upload_dir = os.path.join(BASE_DIR, "../../uploads")
    os.makedirs(upload_dir, exist_ok=True)

    ext = image.filename.split(".")[-1]
    filename = f"{uuid4()}.{ext}"
    file_path = os.path.join(upload_dir, filename)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(image.file, f)

    image_url = f"/uploads/{filename}"
    venue_data = VenueCreate(
        name=name,
        location=location,
        capacity=capacity,
        event_type=event_type,
        venue_id=venue_id,
        availability=availability,
        hourly_rate=hourly_rate,
        contact_info=contact_info,
        image=image_url,
        # venue_hours=[]  
    )
    return create_venue_service(venue=venue_data, db=db)

@router.put("/update/{venue_id}", response_model=VenueResponse)
def update_venue(venue_id: int, update_data: VenueUpdate, db: Session = Depends(get_db)):
    venue = update_venue_service(venue_id, update_data, db)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    return venue

@router.delete("/delete/{venue_id}", response_model=VenueResponse)
def delete_venue(venue_id: int, db: Session = Depends(get_db)):
    venue = delete_venue_service(venue_id, db)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    return delete_venue_service(venue_id, db)