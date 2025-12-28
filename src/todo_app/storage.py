"""
In-memory storage for the Todo CLI Application
Handles all task operations with data stored only in memory
"""

from .models import Task
from typing import List, Optional


class InMemoryStorage:
    """
    In-memory storage implementation for tasks.
    All data exists only in memory and is lost when the application terminates.
    """

    def __init__(self):
        """Initialize the storage with an empty task list and ID counter."""
        self._tasks = {}  # Dictionary to store tasks by ID
        self._next_id = 1  # Counter for generating unique IDs

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Add a new task to storage.

        Args:
            title (str): Title of the task (required, non-empty)
            description (str, optional): Description of the task

        Returns:
            Task: The newly created task with assigned ID

        Raises:
            ValueError: If title is empty
        """
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        task_id = self._next_id
        self._next_id += 1

        task = Task(task_id, title, description, False)
        self._tasks[task_id] = task

        return task

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks in storage.

        Returns:
            List[Task]: List of all tasks, sorted by ID
        """
        return sorted(self._tasks.values(), key=lambda x: x.id)

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a specific task by its ID.

        Args:
            task_id (int): ID of the task to retrieve

        Returns:
            Task or None: The task if found, None otherwise
        """
        return self._tasks.get(task_id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> bool:
        """
        Update an existing task.

        Args:
            task_id (int): ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            bool: True if task was updated, False if task was not found
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return False

        task.update(title, description)
        return True

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task was not found
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def toggle_task_completion(self, task_id: int) -> bool:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): ID of the task to toggle

        Returns:
            bool: True if task status was toggled, False if task was not found
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return False

        task.completed = not task.completed
        return True

    def get_next_id(self) -> int:
        """
        Get the next available ID for a new task.

        Returns:
            int: The next available ID
        """
        return self._next_id