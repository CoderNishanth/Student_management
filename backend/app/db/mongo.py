import motor.motor_asyncio
from app.core.config import MONGODB_URI

MONGO_URI = MONGODB_URI
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["student_portal"]

# Collections
users_collection = db["users"]
students_collection = db["students"]