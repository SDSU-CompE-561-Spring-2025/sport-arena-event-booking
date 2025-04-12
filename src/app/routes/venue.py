from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.venue import Venue
from app.schemas.venue import VenueCreate, VenueUpdate, VenueResponse
from app.models.venue_hours import VenueHours
from app.schemas.venue_hours import VenueHoursCreate, VenueHoursResponse
from typing import List


router = APIRouter()

@router.get("/venues", response_model=List[VenueResponse])
def get_venues(db: Session = Depends(get_db)):
    return venue_service.get_venues_service(db)

@router.get("/venue_hours", response_model=List[VenueHoursResponse])
def get_venue_hours():
    return venue_service.get_venue_hours_service()

@router.post("/create", response_model=VenueResponse)
def create_venue(venue: VenueCreate, db: Session = Depends(get_db)):
    return venue_service.create_venue_service(venue, db)

@router.put("/update/{venue_id}", response_model=VenueResponse)
def update_venue(venue_id: int, update_data: VenueUpdate, db: Session = Depends(get_db)):
    venue = venue_service.update_venue_service(venue_id, update_data, db)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    return venue

@router.delete("/delete/{venue_id}", response_model=VenueResponse)
def delete_venue(venue_id: int, db: Session = Depends(get_db)):
    success = venue_service.delete_venue_service(venue_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Venue not found")
    return {"detail": "Venue deleted successfully"}
