from fastapi import Depends, HTTPException,Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import JWT_SECRET_KEY, JWT_ALGORITHM

SECRET_KEY = JWT_SECRET_KEY
ALGORITHM = JWT_ALGORITHM

async def get_current_user_role(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"email": payload.get("sub"), "role": payload.get("role")}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

def require_admin(current_user: dict = Depends(get_current_user_role)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin can perform this action")
    return current_user
