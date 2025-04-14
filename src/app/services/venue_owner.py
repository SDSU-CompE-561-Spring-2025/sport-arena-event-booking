from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.venue_owner import VenueOwner
from app.schemas.venue_owner import VenueOwnerCreate, VenueOwnerResponse, VenueOwnerUpdate

def create_venue_owner_service(venue_owner: VenueOwnerCreate, db: Session):
    new_owner = VenueOwner(
        venue_id =  venue_owner.venue_id,
        user_id = venue_owner.user_id,
        #
    )
    db.add(new_owner)
    db.commit()
    db.refresh(new_owner)
    return new_owner

def update_venue_owner_service(venue_id: int, user_id: int, update_data: VenueOwnerUpdate, db: Session) -> VenueOwner:
    venue_owner = db.query(VenueOwner).filter(VenueOwner.venue_id == venue_id, VenueOwner.user_id == user_id, VenueOwner.deleted == False).first()
    if not venue_owner:
        raise HTTPException(status_code=404, detail="Venue Owner not found")

    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(venue_owner, key, value)

    db.commit()
    db.refresh(venue_owner)
    return venue_owner

def delete_venue_owner_service(venue_id: int, db: Session):
    venue_owner = db.query(VenueOwner).filter(VenueOwner.venue_id == venue_id, VenueOwner.deleted == False).first()
    if not venue_owner:
        raise HTTPException(status_code=404, detail="Venue Owner not found")

    venue_owner.deleted = True
    db.commit()
    return {"message": "Venue Owner deleted successfully"}

def get_venue_owner_service(venue_id: int, db: Session) -> VenueOwner:
    venue_owner = db.query(VenueOwner).filter(VenueOwner.venue_id == venue_id, VenueOwner.deleted == False).first()
    return venue_owner

def get_venues_owned_service(user_id: int, db: Session) -> list[VenueOwner]:
    venues_owned = db.query(VenueOwner).filter(VenueOwner.user_id == user_id, VenueOwner.deleted == False).all()
    return venues_owned