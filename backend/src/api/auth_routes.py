"""Authentication API routes for the Todo Full-Stack Web Application."""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from ..services.auth import create_access_token
from typing import Optional

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str
    name: str

class AuthResponse(BaseModel):
    user_id: str
    email: str
    name: str
    token: str

@router.post("/login", response_model=AuthResponse)
def login(login_request: LoginRequest):
    """Login endpoint that returns a JWT token."""
    # In a real implementation, you would verify credentials against a database
    # For this demo, we'll accept any credentials and create a mock user

    # Basic validation
    if not login_request.email or not login_request.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password are required"
        )

    # Create mock user data
    user_data = {
        "user_id": f"user_{hash(login_request.email)}",  # Simple mock ID
        "email": login_request.email,
        "name": login_request.email.split('@')[0]  # Use email prefix as name
    }

    # Create JWT token
    token_data = {
        "user_id": user_data["user_id"],
        "email": user_data["email"],
        "name": user_data["name"]
    }
    token = create_access_token(token_data)

    return AuthResponse(
        user_id=user_data["user_id"],
        email=user_data["email"],
        name=user_data["name"],
        token=token
    )

@router.post("/signup", response_model=AuthResponse)
def signup(signup_request: SignupRequest):
    """Signup endpoint that returns a JWT token."""
    # In a real implementation, you would create a new user in the database
    # For this demo, we'll create a mock user

    # Basic validation
    if not signup_request.email or not signup_request.password or not signup_request.name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email, password, and name are required"
        )

    # Create mock user data
    user_data = {
        "user_id": f"user_{hash(signup_request.email)}",  # Simple mock ID
        "email": signup_request.email,
        "name": signup_request.name
    }

    # Create JWT token
    token_data = {
        "user_id": user_data["user_id"],
        "email": user_data["email"],
        "name": user_data["name"]
    }
    token = create_access_token(token_data)

    return AuthResponse(
        user_id=user_data["user_id"],
        email=user_data["email"],
        name=user_data["name"],
        token=token
    )