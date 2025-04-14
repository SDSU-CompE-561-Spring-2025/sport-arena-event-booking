from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.models.venue import Venue
from app.models.venue_hours import VenueHours
from app.schemas.venue import VenueCreate, VenueResponse, VenueUpdate
from app.schemas.venue_hours import VenueHoursCreate, VenueHoursResponse
from typing import List, Optional
from datetime import datetime, date

def get_venues_service(db: Session) -> List[Venue]:
    venues = db.query(Venue).filter(Venue.deleted == False).all()
    return venues

def get_venue_hours_by_venue_id_service(venue_id: int, db: Session) -> List[VenueHours]:
    venue_hours = db.query(VenueHours).filter(
        VenueHours.venue_id == venue_id,
        VenueHours.deleted == False
    ).all()

    if not venue_hours:
        raise HTTPException(status_code=404, detail="No hours found for this venue")

    return venue_hours


def create_venue_service(venue: VenueCreate, db: Session) -> Venue:
    new_venue = Venue(
        name=venue.name,
        venue_id=venue.venue_id,
        location=venue.location,
        capacity=venue.capacity,
        event_type=venue.event_type,
        image=venue.image,
        availability=venue.availability,
        hourly_rate=venue.hourly_rate,
        contact_info=venue.contact_info,
    )
    db.add(new_venue)
    db.commit()
    db.refresh(new_venue)

    if venue.venue_hours:
        for hour in venue.venue_hours:
            today = date.today()  # Use today's date as a placeholder
            open_time = datetime.combine(today, hour.open_time.replace(tzinfo=None))
            close_time = datetime.combine(today, hour.close_time.replace(tzinfo=None))

            venue_hour = VenueHours(
                venue_id=new_venue.id,
                open_time=open_time,
                close_time=close_time,
                blackout_days=hour.blackout_days,
                last_updated=datetime.utcnow()
            )
            db.add(venue_hour)

        db.commit()

    return new_venue

def update_venue_service(venue_id: int, update_data: VenueUpdate, db: Session) -> Venue:
    venue = db.query(Venue).filter(Venue.id == venue_id, Venue.deleted == False).first()
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")

    for key, value in update_data.dict(exclude_unset=True, exclude={"venue_hours"}).items():
        setattr(venue, key, value)

    # Update venue_hours if present
    if update_data.venue_hours:
        venue_hours = db.query(VenueHours).filter(VenueHours.venue_id == venue.id, VenueHours.deleted == False).first()
        if venue_hours:
            hours_data = update_data.venue_hours.dict(exclude_unset=True)

            if "open_time" in hours_data:
                venue_hours.open_time = datetime.combine(date.today(), hours_data["open_time"].replace(tzinfo=None))
            if "close_time" in hours_data:
                venue_hours.close_time = datetime.combine(date.today(), hours_data["close_time"].replace(tzinfo=None))
            if "blackout_days" in hours_data:
                venue_hours.blackout_days = hours_data["blackout_days"]

            venue_hours.last_updated = datetime.utcnow()

    db.commit()
    venue = db.query(Venue).options(joinedload(Venue.venue_hours)).filter(Venue.id == venue_id).first()
    return venue

def delete_venue_service(venue_id: int, db: Session):
    venue = db.query(Venue).filter(Venue.id == venue_id, Venue.deleted == False).first()
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")

    venue.deleted = True
    db.commit()
    db.refresh(venue)
    return venue

