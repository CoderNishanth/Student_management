from fastapi import APIRouter, HTTPException
from app.schemas.Student import StudentOut
from bson import ObjectId
from app.db.mongo import students_collection
from app.core.config import FRONTEND_URL
router = APIRouter()


@router.get("/{student_id}", response_model=StudentOut)
async def get_student(student_id: str):
    student = await students_collection.find_one({"_id": ObjectId(student_id)})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Convert ObjectId to string for response
    student["_id"] = str(student["_id"])
    
    return StudentOut(id=student["_id"], **student)

