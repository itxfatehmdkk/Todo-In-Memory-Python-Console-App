---
id: 3
title: Todo CLI Plan
stage: plan
date: 2025-12-28
surface: agent
model: Claude Sonnet 4.5
feature: todo-cli-app
branch: 1-todo-cli-app
user: Fateh Mohammad
command: sp.plan
labels: [planning, todo-app, architecture]
links:
  spec: specs/1-todo-cli-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-todo-cli-app/plan.md
 - specs/1-todo-cli-app/research.md
 - specs/1-todo-cli-app/data-model.md
 - specs/1-todo-cli-app/contracts/commands.md
 - specs/1-todo-cli-app/quickstart.md
tests:
 - none
---

## Prompt

```text
$ARGUMENTS
```

## Response snapshot

# Implementation Plan: Todo CLI Application

**Branch**: `1-todo-cli-app` | **Date**: 2025-12-28 | **Spec**: [link](../specs/1-todo-cli-app/spec.md)
**Input**: Feature specification from `/specs/1-todo-cli-app/spec.md`

## Summary

Implementation of a command-line todo application that stores tasks in memory. The application will allow users to add, view, update, delete, and mark tasks as complete/incomplete through a menu-based interface. The system will be built using Python 3.13+ with only standard library dependencies as required by the constitution.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: Python standard library only
**Storage**: In-memory only (no persistence)
**Testing**: unittest module (standard library)
**Target Platform**: Linux (WSL2 for Windows users)
**Project Type**: Single console application
**Performance Goals**: All operations complete in under 2 seconds
**Constraints**: <200ms response time for user interactions, memory-only storage, no external dependencies
**Scale/Scope**: Single user, local execution, minimal memory footprint

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ **Constitutional Compliance**: All requirements align with the constitution
- ✅ **Scope Validation**: Single-user CLI application with in-memory storage only
- ✅ **Technical Constraints**: Using Python 3.13+ with standard library only
- ✅ **Domain Boundaries**: Managing only Task entities with id, title, description, completed attributes
- ✅ **No Persistence**: Data exists only in memory and is lost on exit
- ✅ **No Networking**: Application runs locally with no external services
- ✅ **No Additional Attributes**: Only the specified Task attributes will be implemented

## Project Structure

### Documentation (this feature)

```text
specs/1-todo-cli-app/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── todo_app/
│   ├── __init__.py
│   ├── main.py          # CLI entry point and menu system
│   ├── models.py        # Task data model
│   ├── storage.py       # In-memory task storage
│   └── cli.py           # CLI interface and user interaction
└── tests/
    ├── __init__.py
    ├── test_models.py   # Task model tests
    ├── test_storage.py  # Storage functionality tests
    └── test_cli.py      # CLI interface tests
```

**Structure Decision**: Single project structure selected to implement the console application with clear separation of concerns between models, storage, and CLI interface.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

# Research: Todo CLI Application

**Feature**: Todo CLI Application
**Date**: 2025-12-28

## Decision: Python CLI Application Architecture

**Rationale**: Based on the constitution requirements, the application must be a command-line interface using Python 3.13+ with only standard library dependencies. The architecture will follow separation of concerns with distinct modules for data models, storage, and CLI interface.

**Alternatives considered**:
- Web-based interface (rejected - constitution requires CLI only)
- GUI application (rejected - constitution requires CLI only)
- External database (rejected - constitution prohibits persistence)

## Decision: In-Memory Storage Implementation

**Rationale**: The constitution mandates that all data exists only in memory and is lost when the application terminates. We'll implement a simple in-memory storage using Python data structures (list/dict) with automatic ID assignment.

**Alternatives considered**:
- File-based persistence (rejected - constitution prohibits persistence)
- Database storage (rejected - constitution prohibits persistence)
- External caching service (rejected - constitution prohibits external services)

## Decision: Menu-Based CLI Interface

**Rationale**: For a simple todo application, a menu-based interface provides clear user interaction patterns. The CLI will present numbered options to users and handle input validation as required by the specification.

**Alternatives considered**:
- Command-line arguments only (rejected - less user-friendly for interactive todo management)
- Natural language processing (rejected - constitution prohibits AI logic)
- Keyboard shortcuts only (rejected - less discoverable for users)

## Decision: Task Model Structure

**Rationale**: The constitution defines the exact Task structure: id (integer), title (non-empty string), description (optional string), completed (boolean). We'll implement this exact structure without additional attributes.

**Alternatives considered**:
- Adding timestamps (rejected - constitution prohibits additional attributes)
- Adding priority levels (rejected - constitution prohibits additional attributes)
- Adding categories/tags (rejected - constitution prohibits additional attributes)

## Decision: Error Handling Approach

**Rationale**: Following the constitution's requirement for deterministic and human-readable errors, we'll implement clear error messages for all edge cases (invalid IDs, empty titles, etc.) without crashing the application.

**Alternatives considered**:
- Generic error messages (rejected - less helpful for users)
- Exception stack traces (rejected - not user-friendly and could crash app)
- Silent failures (rejected - violates specification requirement for error messages)

# Data Model: Todo CLI Application

**Feature**: Todo CLI Application
**Date**: 2025-12-28

## Entity: Task

**Definition**: A Task represents a single unit of work in the todo application.

**Attributes**:
- `id`: integer, unique per runtime (automatically assigned)
- `title`: string, required, non-empty
- `description`: string, optional (can be empty/null equivalent)
- `completed`: boolean, default = false

**Validation Rules**:
- `id` must be unique within the current application runtime
- `title` must be a non-empty string (length > 0)
- `completed` must be a boolean value (true/false)

**State Transitions**:
- A Task can transition from `completed = false` to `completed = true` (mark complete)
- A Task can transition from `completed = true` to `completed = false` (mark incomplete)

**Relationships**:
- No relationships to other entities (standalone entity as per constitution)

**Constraints**:
- No additional attributes beyond the four specified are permitted (as per constitution)
- All data exists only in memory and is lost when the application terminates

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

## Outcome

- ✅ Impact: Created comprehensive implementation plan for Todo CLI application
- 🧪 Tests: none
- 📁 Files: Created plan.md, research.md, data-model.md, contracts/commands.md, quickstart.md
- 🔁 Next prompts: Ready for task creation with /sp.tasks
- 🧠 Reflection: Plan aligns with constitution requirements and feature specification

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create implementation tasks with /sp.tasks