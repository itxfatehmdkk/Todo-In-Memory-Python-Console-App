# Todo CLI Application with Visual Enhancements

A simple command-line todo application that stores tasks in memory only. All data is lost when the application exits. Features Unicode icons and color-coded status indicators for enhanced user experience.

## Features

- Add tasks with titles and optional descriptions
- View all tasks with their ID and completion status
- Update existing tasks
- Delete tasks
- Toggle completion status of tasks
- Menu-based interface for easy navigation
- **NEW**: Visual enhancements with Unicode icons and color-coded status indicators
- **NEW**: Color-coded messages for success, error, and info feedback

## Requirements

- Python 3.13+ (or compatible Python version)
- Standard library only (with optional colorama for enhanced colors)

## Installation

1. Install colorama for enhanced color support (optional but recommended):
```bash
pip install colorama
```

## Usage

1. Clone or download the repository
2. Navigate to the project directory
3. Run the application:

```bash
python -m src.todo_app.main
```

Or if you're in the src directory:

```bash
python -m todo_app.main
```

## Functionality

The application provides the following options through its menu:

1. **Add Task**: Create a new task with a title and optional description
2. **View Tasks**: Display all tasks with their ID, title, and completion status
3. **Update Task**: Modify an existing task by its ID
4. **Delete Task**: Remove a task by its ID
5. **Toggle Complete**: Change the completion status of a task by its ID
6. **Quit**: Exit the application

## Visual Enhancements

- **Completed Tasks**: Displayed with green color and checkmark icon (✓)
- **Incomplete Tasks**: Displayed with red color and circle icon (○)
- **Success Messages**: Displayed in green
- **Error Messages**: Displayed in red
- **Info Messages**: Displayed in cyan
- **Warning Messages**: Displayed in yellow

## Important Notes

- All data is stored in memory only and will be lost when the application exits
- Task IDs are automatically assigned and are unique within the current session
- Empty titles are not allowed when adding or updating tasks
- Invalid task IDs will result in error messages but won't crash the application
- Colors will automatically adapt to systems that don't support colorama (fallback to plain text)