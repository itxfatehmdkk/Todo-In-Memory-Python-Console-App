# API Contracts: Todo CLI Application

**Feature**: Todo CLI Application
**Date**: 2025-12-28

## Functional Requirements to CLI Commands Mapping

### FR-001: Add New Task
- **Command**: `add`
- **Input**: title (required), description (optional)
- **Validation**: Title must be non-empty
- **Success**: Task created with unique ID, confirmation message
- **Error**: If title is empty, error message displayed

### FR-002: Assign Unique ID
- **Implementation**: Auto-increment from last used ID
- **Guarantee**: ID uniqueness within current runtime
- **Behavior**: ID assigned automatically when task is created

### FR-003: Display All Tasks
- **Command**: `list` or `view`
- **Output**: All tasks with ID, title, and completion status
- **Format**: Tabular format showing ID, Title, Status
- **Special case**: If no tasks exist, show informative message

### FR-004: Update Existing Task
- **Command**: `update`
- **Input**: task ID (required), new title (optional), new description (optional)
- **Validation**: Task ID must exist
- **Success**: Task updated, confirmation message
- **Error**: If ID doesn't exist, error message displayed

### FR-005: Delete Task
- **Command**: `delete`
- **Input**: task ID (required)
- **Validation**: Task ID must exist
- **Success**: Task removed, confirmation message
- **Error**: If ID doesn't exist, error message displayed

### FR-006: Toggle Completion Status
- **Command**: `toggle` or `complete`
- **Input**: task ID (required)
- **Validation**: Task ID must exist
- **Behavior**: Toggle completed status (true ↔ false)
- **Success**: Status updated, new status confirmed
- **Error**: If ID doesn't exist, error message displayed

### FR-007: Reject Empty Titles
- **Implementation**: Input validation in add and update operations
- **Behavior**: Reject with clear error message
- **Message**: "Title cannot be empty"

### FR-008: Clear Error Messages
- **Implementation**: Specific error messages for each error condition
- **Examples**:
  - "Task with ID X does not exist"
  - "Title cannot be empty"
  - "Invalid command"

### FR-009: In-Memory Storage
- **Implementation**: All data stored in Python data structures
- **Behavior**: Data lost when application exits
- **No persistence**: No file or database operations

### FR-010: Menu-Based CLI
- **Interface**: Interactive menu with numbered options
- **Commands**: add, list, update, delete, toggle, quit
- **Input validation**: Handle invalid inputs gracefully
- **Error handling**: Continue operation after errors (no crashes)