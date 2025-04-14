from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.venue_owner import VenueOwner
from app.schemas.venue_owner import VenueOwnerCreate, VenueOwnerUpdate, VenueOwnerResponse
from app.services.venue_owner import *
from typing import List

router = APIRouter()

@router.post("/create", response_model=VenueOwnerResponse)
def create_venue_owner(venue_owner: VenueOwnerCreate, db: Session = Depends(get_db)):
    return create_venue_owner_service(venue_owner, db)

@router.put("/update/{venue_id}/{user_id}", response_model=VenueOwnerResponse)
def update_venue(venue_id: int, user_id: int, update_data: VenueOwnerUpdate, db: Session = Depends(get_db)):
    venue_owner = update_venue_owner_service(venue_id, user_id, update_data, db)
    if not venue_owner:
        raise HTTPException(status_code=404, detail="Venue owner not found")
    return venue_owner

@router.delete("/delete/{venue_id}")
def delete_venue_owner(venue_id: int, db: Session = Depends(get_db)):
    success = delete_venue_owner_service(venue_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Venue owner not found")
    return {"detail": "Venue owner deleted successfully"}

@router.get("/{venue_id}", response_model=VenueOwnerResponse)
def get_venue_owner(venue_id: int, db: Session = Depends(get_db)):
    return get_venue_owner_service(venue_id, db)

@router.get("/{user_id}/venues_owned", response_model=List[VenueOwnerResponse])
def get_owned_venues(db: Session = Depends(get_db)):
    return get_venues_owned_service(db)