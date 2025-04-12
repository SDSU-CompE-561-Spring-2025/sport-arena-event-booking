from fastapi import APIRouter
router = APIRouter()

@router.get("/venues")
async def get_venues():
    return {"message": "Venues retrieved successfully"}

@router.post("/venues")
async def create_venue():
    return {"message": "Venue created successfully"}

@router.put("/venues")
async def update_venue():
    return {"message": "Venue updated successfully"}

@router.delete("/venues")
async def delete_venue():
    return {"message": "Venue deleted successfully"}
