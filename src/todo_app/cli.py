"""
CLI interface for the Todo CLI Application
Handles user interaction through a menu-based interface with visual enhancements
"""

from .storage import InMemoryStorage
from .models import Task
from . import colors
from typing import Optional


class TodoCLI:
    """
    Command-Line Interface for the Todo application.
    Provides a menu-based interface for users to interact with tasks with visual enhancements.
    """

    def __init__(self):
        """Initialize the CLI with storage."""
        self.storage = InMemoryStorage()

    def display_menu(self):
        """Display the main menu options with visual enhancements."""
        print(f"\n{colors.get_operation_color('info')}" + "="*40 + colors.reset_color())
        print(f"{colors.get_operation_color('info')}Todo CLI Application{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}" + "="*40 + colors.reset_color())
        print(f"{colors.get_operation_color('info')}1. Add Task{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}2. View Tasks{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}3. Update Task{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}4. Delete Task{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}5. Toggle Complete{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}6. Quit{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}" + "-"*40 + colors.reset_color())

    def get_user_choice(self) -> str:
        """
        Get user's menu choice.

        Returns:
            str: User's menu choice
        """
        try:
            choice = input(f"{colors.get_operation_color('info')}Enter your choice: {colors.reset_color()}").strip()
            return choice
        except (EOFError, KeyboardInterrupt):
            return "6"  # Return 'Quit' option on interrupt

    def add_task(self):
        """Handle adding a new task with visual feedback."""
        print(f"\n{colors.get_operation_color('info')}--- Add New Task ---{colors.reset_color()}")
        try:
            title = input(f"{colors.get_operation_color('info')}Enter task title: {colors.reset_color()}").strip()
            if not title:
                colors.print_colored_message("Error: Title cannot be empty", "error")
                return

            description_input = input(f"{colors.get_operation_color('info')}Enter task description (optional, press Enter to skip): {colors.reset_color()}").strip()
            description = description_input if description_input else None

            task = self.storage.add_task(title, description)
            colors.print_colored_message(f"Task added successfully with ID: {task.id}", "success")
        except ValueError as e:
            colors.print_colored_message(f"Error: {e}", "error")
        except Exception as e:
            colors.print_colored_message(f"Unexpected error occurred: {e}", "error")

    def view_tasks(self):
        """Handle viewing all tasks with visual indicators."""
        print(f"\n{colors.get_operation_color('info')}--- View Tasks ---{colors.reset_color()}")
        tasks = self.storage.get_all_tasks()

        if not tasks:
            colors.print_colored_message("No tasks found.", "info")
            return

        print(f"{colors.get_operation_color('info')}{'ID':<4} | {'Title':<20} | {'Status':<15}{colors.reset_color()}")
        print(f"{colors.get_operation_color('info')}" + "-" * 40 + colors.reset_color())
        for task in tasks:
            status_icon = colors.get_status_icon(task.completed)
            status_color = colors.get_status_color(task.completed)
            reset = colors.reset_color()

            status_text = "Completed" if task.completed else "Incomplete"
            colored_status = f"{status_color}{status_text}{reset}"
            colored_title = f"{status_color}{task.title[:18]}{reset}"

            print(f"{status_color}{task.id:<4}{reset} | {colored_title:<20} | {colored_status:<15}")

    def update_task(self):
        """Handle updating an existing task with visual feedback."""
        print(f"\n{colors.get_operation_color('info')}--- Update Task ---{colors.reset_color()}")
        try:
            task_id_input = input(f"{colors.get_operation_color('info')}Enter task ID to update: {colors.reset_color()}").strip()
            if not task_id_input:
                colors.print_colored_message("Error: Task ID cannot be empty", "error")
                return

            try:
                task_id = int(task_id_input)
            except ValueError:
                colors.print_colored_message("Error: Task ID must be a number", "error")
                return

            # Check if task exists
            existing_task = self.storage.get_task_by_id(task_id)
            if existing_task is None:
                colors.print_colored_message(f"Error: Task with ID {task_id} does not exist", "error")
                return

            # Display current task with visual indicators
            current_status = colors.format_task_display(existing_task)
            print(f"{colors.get_operation_color('info')}Current task: {colors.reset_color()}{current_status}")

            title_input = input(f"{colors.get_operation_color('info')}Enter new title (current: '{existing_task.title}', press Enter to keep current): {colors.reset_color()}").strip()
            description_input = input(f"{colors.get_operation_color('info')}Enter new description (current: '{existing_task.description}', press Enter to keep current): {colors.reset_color()}").strip()

            # Prepare update values
            new_title = title_input if title_input else None
            new_description = description_input if description_input else None

            # If user pressed Enter without typing anything, set to None to keep current value
            if title_input == "":
                new_title = None
            if description_input == "":
                new_description = None

            # Update the task
            success = self.storage.update_task(task_id, new_title, new_description)
            if success:
                colors.print_colored_message("Task updated successfully", "success")
            else:
                colors.print_colored_message("Error: Failed to update task", "error")

        except ValueError as e:
            colors.print_colored_message(f"Error: {e}", "error")
        except Exception as e:
            colors.print_colored_message(f"Unexpected error occurred: {e}", "error")

    def delete_task(self):
        """Handle deleting a task with visual feedback."""
        print(f"\n{colors.get_operation_color('info')}--- Delete Task ---{colors.reset_color()}")
        try:
            task_id_input = input(f"{colors.get_operation_color('info')}Enter task ID to delete: {colors.reset_color()}").strip()
            if not task_id_input:
                colors.print_colored_message("Error: Task ID cannot be empty", "error")
                return

            try:
                task_id = int(task_id_input)
            except ValueError:
                colors.print_colored_message("Error: Task ID must be a number", "error")
                return

            # Check if task exists
            existing_task = self.storage.get_task_by_id(task_id)
            if existing_task is None:
                colors.print_colored_message(f"Error: Task with ID {task_id} does not exist", "error")
                return

            # Display task to delete with visual indicators
            task_to_delete = colors.format_task_display(existing_task)
            print(f"{colors.get_operation_color('info')}Task to delete: {colors.reset_color()}{task_to_delete}")

            confirm = input(f"{colors.get_operation_color('warning')}Are you sure you want to delete this task? (y/N): {colors.reset_color()}").strip().lower()

            if confirm in ['y', 'yes']:
                success = self.storage.delete_task(task_id)
                if success:
                    colors.print_colored_message("Task deleted successfully", "success")
                else:
                    colors.print_colored_message("Error: Failed to delete task", "error")
            else:
                colors.print_colored_message("Task deletion cancelled", "info")

        except ValueError as e:
            colors.print_colored_message(f"Error: {e}", "error")
        except Exception as e:
            colors.print_colored_message(f"Unexpected error occurred: {e}", "error")

    def toggle_task_completion(self):
        """Handle toggling task completion status with visual feedback."""
        print(f"\n{colors.get_operation_color('info')}--- Toggle Task Completion ---{colors.reset_color()}")
        try:
            task_id_input = input(f"{colors.get_operation_color('info')}Enter task ID to toggle: {colors.reset_color()}").strip()
            if not task_id_input:
                colors.print_colored_message("Error: Task ID cannot be empty", "error")
                return

            try:
                task_id = int(task_id_input)
            except ValueError:
                colors.print_colored_message("Error: Task ID must be a number", "error")
                return

            # Check if task exists
            existing_task = self.storage.get_task_by_id(task_id)
            if existing_task is None:
                colors.print_colored_message(f"Error: Task with ID {task_id} does not exist", "error")
                return

            # Display current task with visual indicators
            current_status = colors.format_task_display(existing_task)
            print(f"{colors.get_operation_color('info')}Current task: {colors.reset_color()}{current_status}")

            success = self.storage.toggle_task_completion(task_id)
            if success:
                updated_task = self.storage.get_task_by_id(task_id)
                status_text = "completed" if updated_task.completed else "incomplete"
                status_type = "completed" if updated_task.completed else "incomplete"

                colors.print_colored_message(f"Task marked as {status_text}", status_type)
            else:
                colors.print_colored_message("Error: Failed to toggle task completion", "error")

        except ValueError as e:
            colors.print_colored_message(f"Error: {e}", "error")
        except Exception as e:
            colors.print_colored_message(f"Unexpected error occurred: {e}", "error")

    def run(self):
        """Run the main application loop with visual enhancements."""
        colors.print_colored_message("Welcome to the Todo CLI Application!", "info")
        colors.print_colored_message("All data is stored in memory only and will be lost when the application exits.", "info")

        while True:
            self.display_menu()
            choice = self.get_user_choice()

            if choice == "1":
                self.add_task()
            elif choice == "2":
                self.view_tasks()
            elif choice == "3":
                self.update_task()
            elif choice == "4":
                self.delete_task()
            elif choice == "5":
                self.toggle_task_completion()
            elif choice == "6":
                colors.print_colored_message("Thank you for using the Todo CLI Application. Goodbye!", "info")
                break
            else:
                colors.print_colored_message("Invalid choice. Please enter a number between 1 and 6.", "error")

            # Pause to let user see the result before showing menu again
            input(f"\n{colors.get_operation_color('info')}Press Enter to continue...{colors.reset_color()}")