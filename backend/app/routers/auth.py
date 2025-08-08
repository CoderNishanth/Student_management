from fastapi import APIRouter, Request, Response, HTTPException,status
from app.core.security import verify_password, create_access_token
from datetime import timedelta
from app.db.mongo import users_collection
from app.schemas.User import UserLogin
from jose import jwt, JWTError # type: ignore
from app.core.config import JWT_SECRET_KEY,JWT_ALGORITHM;

SECRET_KEY = JWT_SECRET_KEY
ALGORITHM = JWT_ALGORITHM

router = APIRouter()

async def authenticate_user(email: str, password: str):
    user = await users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        return None
    return user

@router.post("/login")
async def login(response: Response, form_data: UserLogin):
    user = await authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}
    )
    
    # Set secure HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=3600,
        secure=False,  # Set to True in production (HTTPS)
        samesite="Lax",
        path="/",
    )

    return {"message": "Login successful","email": user["email"], "role": user["role"]}

@router.get("/me")
async def get_current_user(request: Request):
    access_token = request.cookies.get("access_token")
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"email": email, "role": role}
