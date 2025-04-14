EventEz [Sports Arena Event Booking]

EventEz is a full stack web application built with FastAPI for managing event bookings. It serves as a platform for discovering and booking events with a simple, reliable, and user-friendly interface. Whether you're hosting or attending events, EventEz simplifies the process with secure authentication, CRUD operations, and comprehensive API endpoints.

OVERVIEW

    User Authentication: Register, login, update/delete users

    Bookings Management: Create, update, delete, and list bookings for events and venues.

    Venue Management: CRUD operations for venues and associated venue hours.

    Session Tracking: Manage login sessions with a dedicated database model for sessions

TECHNOLOGIES

    Backend Framework: FastAPI

    Database: SQLAlchemy (with SQLite for development/testing and easily configurable for other RDBMS)

    Authentication: JWT with passlib for secure password hashing.

    Dependency Management: Poetry and pip.

    Containerization: Docker

SETUP

    1. Clone the repository
    2. Run via Docker
       - Build the Docker Image
       - Run the Container
    3. Change Directory to "/app"
    4. Pull using "git pull origin main"
    5. Expose port 8000
    6. Go to http://localhost:8000/docs 

TESTING USING CURL

Ensure you have curl installed on your system.
*Replace "$TOKEN" in all requests with your actual JWT token from the login response.*

[USER ENDPOINTS]

    1. Register a User: Registers a new user with specified details.
    
    curl -X POST http://localhost:8000/user/register \
      -H "Content-Type: application/json" \
      -d '{
        "user_role": 1,
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@example.com",
        "password": "secret123",
        "phone_number": "1234567890"
      }'

    2. Login: Logs in using form data. Returns a JWT token required for subsequent authenticated requests.

    curl -X POST http://localhost:8000/user/login \
      -H "Content-Type: application/x-www-form-urlencoded" \
      -d "username=testuser&password=secret123"

    3. Get Your Profile: Retrieves the logged-in user's profile. Replace $TOKEN with the JWT token from login

    curl http://localhost:8000/user/me \
      -H "Authorization: Bearer $TOKEN"

    4. Update Your Profile: updates the profile details of the user with ID 1

    curl -X PUT http://localhost:8000/user/update/1 \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"first_name": "UpdatedName", "phone_number": "1112223333"}'

    5. Logout: Logs out the current user, invalidating the session.

    curl -X POST http://localhost:8000/user/logout \
      -H "Authorization: Bearer $TOKEN"

[VENUE ENDPOINTS]

    6. Create a Venue: Creates a new venue with the provided details.

    curl -X POST http://localhost:8000/venue/create \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Grand Arena",
        "venue_id": 100,
        "location": "City Center",
        "capacity": 200,
        "event_type": "sports",
        "hourly_rate": 1200
      }'

    7. Get All Venues: Retrieves all venues

    curl http://localhost:8000/venue/ \
      -H "Authorization: Bearer $TOKEN"

[BOOKING ENDPOINTS]

    8. Create a Booking: Creates a new booking (note that the backend overrides the user_id with the logged-in user's id).

    curl -X POST http://localhost:8000/bookings/ \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "user_id": 1,
        "venue_id": 2,
        "date": "2024-04-15",
        "time_slot": "10:00 AM - 11:00 AM",
        "hours": 1
      }'

    9. Get Your Bookings

    curl http://localhost:8000/bookings/ \
      -H "Authorization: Bearer $TOKEN"

    10. Get Booking by ID: Retrieves the booking details for the booking with ID 1.

    curl http://localhost:8000/bookings/1 \
      -H "Authorization: Bearer $TOKEN"

    11. Update a booking: Updates the booking with ID 1—changing the time slot and duration.

    curl -X PUT http://localhost:8000/bookings/1 \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"time_slot": "2:00 PM - 3:00 PM", "hours": 2}'

    12. Delete a Booking: Deletes the booking with ID 1.

    curl -X DELETE http://localhost:8000/bookings/1 \
      -H "Authorization: Bearer $TOKEN"

[VENUE CREATION EXAMPLES]
    
    Creates additional venues along with comprehensive details.
   
    13. 
    curl -X 'POST' \
      'http://localhost:8000/venues/create' \
      -H 'Content-Type: application/json' \
      -d '{
        "name": "Madison Square Garden",
        "venue_id": 2,
        "location": "New York",
        "capacity": 20000,
        "event_type": "Concert",
        "image": "msg.jpg",
        "availability": true,
        "hourly_rate": 150000,
        "contact_info": "contact@msg.com",
        "venue_hours": [
          {
            "open_time": "08:00:00.000Z",
            "close_time": "23:00:00.000Z",
            "blackout_days": "Monday"
          }
        ]
      }'

    14. 
    curl -X 'POST' \
      'http://localhost:8000/venues/create' \
      -H 'Content-Type: application/json' \
      -d '{
        "name": "Beachside Pavilion",
        "venue_id": 3,
        "location": "Santa Monica",
        "capacity": 300,
        "event_type": "Wedding",
        "image": "pavilion.jpg",
        "availability": true,
        "hourly_rate": 2500,
        "contact_info": "info@beachpavilion.com",
        "venue_hours": [
          {
            "open_time": "09:00:00.000Z",
            "close_time": "21:00:00.000Z",
            "blackout_days": "Saturday"
          }
        ]
      }'

[VENUE OWNER ENDPOINTS]

    1. Assign a User as the Owner of a Venue: Assigns a user (with user_id: 3) as the owner for a specific venue (venue_id: 5).

    curl -X POST http://localhost:8000/venue_owner/create \
      -H "Content-Type: application/json" \
      -d '{"venue_id": 5, "user_id": 3}'

    2. Update a Venue's Owner: Changes ownership of the venue by assigning a new user (new_user_id: 4).

    curl -X PUT http://localhost:8000/venue_owner/update \
      -H "Content-Type: application/json" \
      -d '{"venue_id": 5, "new_user_id": 4, "deleted": false}'

    3. Get Owner by Venue ID: Fetches the active owner details for the venue with ID 5.

    curl -X GET http://localhost:8000/venue_owner/venue/5

    4. Delete a Venue Owner: Removes the venue ownership for the venue with ID 5.

    curl -X DELETE http://localhost:8000/venue_owner/delete/5

    5. Get All Venues Owned by a User: Assigns a user (with user_id: 7) as the owner for multiple venues, then retrieves all venues owned by that user.

    curl -X POST http://localhost:8000/venue_owner/create \
      -H "Content-Type: application/json" \
      -d '{"venue_id": 7, "user_id": 7}'
      
    curl -X POST http://localhost:8000/venue_owner/create \
      -H "Content-Type: application/json" \
      -d '{"venue_id": 8, "user_id": 7}'

    curl -X GET http://localhost:8000/venue_owner/user/7











