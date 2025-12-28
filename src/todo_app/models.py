"""
Task model for the Todo CLI Application
Represents a single unit of work with id, title, description, and completion status
"""

class Task:
    """
    Represents a single unit of work in the todo application.

    Attributes:
        id: integer, unique per runtime (automatically assigned)
        title: string, required, non-empty
        description: string, optional (can be empty/null equivalent)
        completed: boolean, default = false
    """

    def __init__(self, task_id, title, description=None, completed=False):
        """
        Initialize a Task instance.

        Args:
            task_id (int): Unique identifier for the task
            title (str): Required title of the task (non-empty)
            description (str, optional): Optional description of the task
            completed (bool): Completion status, defaults to False
        """
        if not isinstance(task_id, int):
            raise ValueError("Task ID must be an integer")

        if not isinstance(title, str) or not title.strip():
            raise ValueError("Task title must be a non-empty string")

        if description is not None and not isinstance(description, str):
            raise ValueError("Task description must be a string or None")

        if not isinstance(completed, bool):
            raise ValueError("Task completion status must be a boolean")

        self.id = task_id
        self.title = title.strip()
        self.description = description.strip() if description else None
        self.completed = completed

    def __str__(self):
        """String representation of the task."""
        status = "✓" if self.completed else "○"
        return f"[{status}] {self.id}: {self.title}"

    def __repr__(self):
        """Detailed string representation of the task."""
        return f"Task(id={self.id}, title='{self.title}', description='{self.description}', completed={self.completed})"

    def to_dict(self):
        """Convert task to dictionary representation."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

    def update(self, title=None, description=None):
        """
        Update the task's title and/or description.

        Args:
            title (str, optional): New title for the task
            description (str, optional): New description for the task
        """
        if title is not None:
            if not isinstance(title, str) or not title.strip():
                raise ValueError("Task title must be a non-empty string")
            self.title = title.strip()

        if description is not None:
            if description is not None and not isinstance(description, str):
                raise ValueError("Task description must be a string or None")
            self.description = description.strip() if description else None