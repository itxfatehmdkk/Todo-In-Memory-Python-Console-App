"""Database models for the Todo Full-Stack Web Application."""

from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class TaskBase(SQLModel):
    """Base model for task with common fields."""
    title: str = Field(min_length=1)
    description: Optional[str] = None
    completed: bool = False


class Task(TaskBase, table=True):
    """Task model for the database."""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str  # Removed foreign key constraint for development
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class TaskCreate(TaskBase):
    """Model for creating a new task."""
    pass


class TaskUpdate(SQLModel):
    """Model for updating an existing task."""
    title: Optional[str] = Field(default=None, min_length=1)
    description: Optional[str] = None
    completed: Optional[bool] = None


class TaskPublic(TaskBase):
    """Public model for task with ID and timestamps."""
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime