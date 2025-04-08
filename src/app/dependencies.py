from app.core.database import SessionLocal

# Dependency function that provides a new database session
def get_db():
    # Create a new session instance to interact with the db
    db = SessionLocal()

    # Yield the database session to the caller (the route handler)
    try:
        yield db
    
    # Close the dtabase session
    finally:
        db.close()