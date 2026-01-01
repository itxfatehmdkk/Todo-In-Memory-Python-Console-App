"""
Task service layer for the Todo Full-Stack Web Application.
Handles all business logic related to task operations.
"""

from datetime import datetime
from typing import List, Optional

from sqlmodel import Session, select

from ..models.task import (
    Task,
    TaskCreate,
    TaskUpdate,
    TaskPublic,
)


class TaskService:
    """Service class responsible for task-related operations."""

    def create_task(
        self,
        session: Session,
        task_data: TaskCreate,
        user_id: str,
    ) -> TaskPublic:
        """Create a new task for a specific user."""

        task = Task(
            title=task_data.title,
            description=task_data.description,
            completed=task_data.completed or False,
            user_id=user_id,
        )

        session.add(task)
        session.commit()
        session.refresh(task)

        return TaskPublic.model_validate(task)

    def get_tasks(
        self,
        session: Session,
        user_id: str,
        status: Optional[str] = None,
        sort: Optional[str] = None,
    ) -> List[TaskPublic]:
        """Retrieve all tasks for a user with optional filtering and sorting."""

        query = select(Task).where(Task.user_id == user_id)

        # Filter by status (case-insensitive and handle potential whitespace)
        # Using integer comparison for SQLite boolean compatibility (0=False, 1=True)
        if status and status.strip().lower() == "pending":
            # Filter for tasks that are not completed (completed = 0)
            query = select(Task).where(
                (Task.user_id == user_id) &
                (Task.completed == 0)
            )
        elif status and status.strip().lower() == "completed":
            # Filter for tasks that are completed (completed = 1)
            query = select(Task).where(
                (Task.user_id == user_id) &
                (Task.completed == 1)
            )
        else:
            # For "all" or invalid status, just filter by user_id
            query = select(Task).where(Task.user_id == user_id)

        # Sort results
        if sort == "title":
            query = query.order_by(Task.title)
        else:
            query = query.order_by(Task.created_at)

        tasks = session.exec(query).all()

        return [TaskPublic.model_validate(task) for task in tasks]

    def get_task(
        self,
        session: Session,
        task_id: int,
        user_id: str,
    ) -> Optional[TaskPublic]:
        """Retrieve a single task by ID for a user."""

        task = session.exec(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == user_id,
            )
        ).first()

        if not task:
            return None

        return TaskPublic.model_validate(task)

    def update_task(
        self,
        session: Session,
        task_id: int,
        user_id: str,
        task_data: TaskUpdate,
    ) -> Optional[TaskPublic]:
        """Update an existing task for a user."""

        task = session.exec(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == user_id,
            )
        ).first()

        if not task:
            return None

        # Pydantic v2 compatible update
        updates = task_data.model_dump(exclude_unset=True)

        for field, value in updates.items():
            setattr(task, field, value)

        task.updated_at = datetime.now()

        session.add(task)
        session.commit()
        session.refresh(task)

        return TaskPublic.model_validate(task)

    def delete_task(
        self,
        session: Session,
        task_id: int,
        user_id: str,
    ) -> bool:
        """Delete a task belonging to a user."""

        task = session.exec(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == user_id,
            )
        ).first()

        if not task:
            return False

        session.delete(task)
        session.commit()
        return True

    def toggle_task_completion(
        self,
        session: Session,
        task_id: int,
        user_id: str,
    ) -> Optional[TaskPublic]:
        """Toggle the completion status of a task."""

        task = session.exec(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == user_id,
            )
        ).first()

        if not task:
            return None

        task.completed = not task.completed
        task.updated_at = datetime.now()

        session.add(task)
        session.commit()
        session.refresh(task)

        return TaskPublic.model_validate(task)


# Singleton instance
task_service = TaskService()
