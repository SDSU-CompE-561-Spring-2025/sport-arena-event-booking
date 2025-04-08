from fastAPI import APIRouter
router = APIRouter()

@router.post("/register")
async def register_user():
    return {"message": "User registered successfully"}

@router.get("/user")
async def get_user():
    return {"message": "User details retrieved successfully"}

@router.get("/user/{user_id}")
async def get_user_by_id(user_id: int):
    return {"message": f"User details for user {user_id} retrieved successfully"}

@router.post("users/create")
async def create_user():
    return {"message": "User created successfully"}

@router.post("users/login")
async def login_user():
    return {"message": "User logged in successfully"}

@router.put("users/update/{user_id}")
async def update_user(user_id: int):
    return {"message": f"User {user_id} updated successfully"}

@router.delete("users/delete/{user_id}")
async def delete_user(user_id: int):
    return {"message": f"User {user_id} deleted successfully"}

@router.post("users/logout")
async def logout_user():
    return {"message": "User logged out successfully"}
