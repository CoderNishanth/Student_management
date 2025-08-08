from fastapi import APIRouter, Depends, HTTPException
from app.schemas.User import UserCreate, UserOut
from app.db.mongo import users_collection
from app.core.security import hash_password
from app.schemas.Student import StudentCreate, StudentOut, StudentUpdate
from app.services.qr_code import generate_qr_base64
from bson import ObjectId
from datetime import date, datetime
from app.db.mongo import students_collection
from app.dependencies.dependencies import require_admin
from app.core.config import FRONTEND_URL

router = APIRouter()

@router.post("/create-user", response_model=UserOut)
async def create_user(user: UserCreate, curr_user: dict = Depends(require_admin)):
    
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    
    result = await users_collection.insert_one(user_dict)
    user_out = UserOut(id=str(result.inserted_id), **user.dict(exclude={"password"}))
    return user_out

@router.post("/create-student", response_model=StudentOut)
async def create_student(
    student: StudentCreate,
    current_user: dict = Depends(require_admin)  # 🛡️ Only admins allowed
):
    student_dict = student.dict()
    student_dict["_id"] = ObjectId()
    student_id = str(student_dict["_id"])
    
    # Ensure DOB is converted to datetime if needed
    if isinstance(student_dict["dob"], date):
        student_dict["dob"] = datetime.combine(student_dict["dob"], datetime.min.time())
    
    # Generate QR code containing the student detail URL
    qr_code_base64 = generate_qr_base64(f"{FRONTEND_URL}/studentdetails/{student_id}")
    student_dict["qr_code"] = qr_code_base64
    
    await students_collection.insert_one(student_dict)
    
    return StudentOut(id=student_id, qr_code=qr_code_base64, **student.dict())
@router.put("/edit/{student_id}", response_model=StudentOut)
async def update_student(
    student_id: str,
    student: StudentUpdate,
    current_user: dict = Depends(require_admin)
):
    if not ObjectId.is_valid(student_id):
        raise HTTPException(status_code=400, detail="Invalid student ID")
    
    student_dict = student.dict(exclude_unset=True)

    if "dob" in student_dict and isinstance(student_dict["dob"], date):
        student_dict["dob"] = datetime.combine(student_dict["dob"], datetime.min.time())

    result = await students_collection.update_one(
        {"_id": ObjectId(student_id)},
        {"$set": student_dict}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Student not found or no changes made")

    # ✅ Fetch updated student with qr_code
    updated_student = await students_collection.find_one({"_id": ObjectId(student_id)})

    if not updated_student:
        raise HTTPException(status_code=404, detail="Student not found after update")
    
    updated_student["id"] = str(updated_student["_id"])
    return StudentOut(**updated_student)

@router.get("/students", response_model=list[StudentOut])
async def get_students(curr_user: dict = Depends(require_admin)):
    students = await students_collection.find().to_list(100)
    return [StudentOut(id=str(student["_id"]), **student) for student in students]
