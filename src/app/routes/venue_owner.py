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

@router.put("/update", response_model=VenueOwnerResponse)
def update_venue(update_data: VenueOwnerUpdate, db: Session = Depends(get_db)):
    venue_owner = update_venue_owner_service(update_data=update_data, venue_id=update_data.venue_id, new_user_id=update_data.new_user_id, db=db)
    if not venue_owner:
        raise HTTPException(status_code=404, detail="Venue owner not found")
    return venue_owner

@router.delete("/delete/{venue_id}")
def delete_venue_owner(venue_id: int, db: Session = Depends(get_db)):
    success = delete_venue_owner_service(venue_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Venue owner not found")
    return {"detail": "Venue owner deleted successfully"}

@router.get("/venue/{venue_id}", response_model=VenueOwnerResponse)
def get_venue_owner(venue_id: int, db: Session = Depends(get_db)):
    return get_venue_owner_service(venue_id=venue_id, db=db)

@router.get("/user/{user_id}", response_model=List[VenueOwnerResponse])
def get_owned_venues(user_id: int, db: Session = Depends(get_db)):
    return get_venues_owned_service(user_id=user_id, db=db)