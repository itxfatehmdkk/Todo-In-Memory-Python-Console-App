"""Authentication service for the Todo Full-Stack Web Application."""

from typing import Optional
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWTError
from pydantic import BaseModel


# JWT configuration
JWT_SECRET = "todo-app-dev-secret"  # Development secret - should be in environment variables in production
ALGORITHM = "HS256"


class TokenData(BaseModel):
    """Model for token data."""
    user_id: str
    email: str


security = HTTPBearer()


def verify_token(token: str) -> Optional[TokenData]:
    """Verify JWT token and return user data."""
    try:
        # Decode the token
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        email: str = payload.get("email")

        if user_id is None or email is None:
            return None

        token_data = TokenData(user_id=user_id, email=email)
        return token_data
    except PyJWTError:
        return None


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """Get current user from JWT token."""
    token_data = verify_token(credentials.credentials)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token_data


def create_access_token(data: dict) -> str:
    """Create a new access token."""
    # In a real implementation, this would properly encode the token
    # For now, returning a mock token for the implementation
    return jwt.encode(data, JWT_SECRET, algorithm=ALGORITHM)