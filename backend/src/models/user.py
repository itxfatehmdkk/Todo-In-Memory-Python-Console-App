"""User model for the Todo Full-Stack Web Application."""

from datetime import datetime
from sqlmodel import Field, SQLModel
from typing import Optional


class UserBase(SQLModel):
    """Base model for user with common fields."""
    email: str
    name: str


class User(UserBase, table=True):
    """User model for the database (managed by Better Auth)."""
    id: str = Field(primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    theme_preference: Optional[str] = Field(default="system", max_length=20)  # light, dark, or system


class UserPublic(UserBase):
    """Public model for user with ID and timestamps."""
    id: str
    created_at: datetime
    theme_preference: Optional[str] = "system"  # light, dark, or system