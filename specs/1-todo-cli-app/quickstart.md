# Quickstart Guide: Todo CLI Application

**Feature**: Todo CLI Application
**Date**: 2025-12-28

## Getting Started

This guide will help you set up and run the Todo CLI application.

### Prerequisites

- Python 3.13+ installed
- UV package manager (for dependency management)
- Linux environment (WSL2 for Windows users)

### Installation

1. Clone the repository (if applicable):
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Set up the Python environment:
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies (if any beyond standard library):
   ```bash
   # Since we're using only standard library, no pip install needed
   # But if dependencies were required:
   # uv pip install -r requirements.txt
   ```

### Running the Application

1. Navigate to the source directory:
   ```bash
   cd src/todo_app/
   ```

2. Run the application:
   ```bash
   python main.py
   ```

### Using the Application

When you run the application, you'll see a menu with the following options:

1. **Add Task**: Creates a new task with a title and optional description
2. **View Tasks**: Shows all tasks with their ID, title, and completion status
3. **Update Task**: Modifies an existing task by ID
4. **Delete Task**: Removes a task by ID
5. **Toggle Complete**: Changes the completion status of a task by ID
6. **Quit**: Exits the application

### Example Usage

```
Todo CLI Application
===================

1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Toggle Complete
6. Quit

Enter your choice: 1
Enter task title: Buy groceries
Enter task description (optional): Need to buy milk and bread
Task added successfully with ID: 1

Enter your choice: 2
ID  | Title          | Status
----|----------------|--------
1   | Buy groceries  | Incomplete
```

### Important Notes

- All data is stored in memory only and will be lost when the application exits
- Task IDs are automatically assigned and unique within the current session
- Empty titles are not allowed when adding or updating tasks
- Invalid task IDs will result in error messages but won't crash the application