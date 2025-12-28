---
id: 2
title: Todo CLI Spec
stage: spec
date: 2025-12-28
surface: agent
model: Claude Sonnet 4.5
feature: todo-cli-app
branch: 1-todo-cli-app
user: Fateh Mohammad
command: sp.specify
labels: [specification, todo-app, cli]
links:
  spec: specs/1-todo-cli-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-todo-cli-app/spec.md
 - specs/1-todo-cli-app/checklists/requirements.md
tests:
 - none
---

## Prompt

```text
# Specification
## Phase I – Todo In-Memory Console Application

### 1. Objective
Define the complete functional behavior of the Phase I Todo application.

The system is a command-line tool that allows a single user to manage
Todo tasks stored entirely in memory.

---

### 2. Domain Model

#### Entity: Task
A Task represents a single unit of work.

Attributes:
- id: integer, unique per runtime
- title: string, required, non-empty
- description: string, optional
- completed: boolean, default = false

---

### 3. Core Functionalities

#### 3.1 Add Task
- The system SHALL allow the user to create a new task.
- The user SHALL provide a title.
- The user MAY provide a description.
- The system SHALL reject empty titles.
- A unique ID SHALL be assigned automatically.
- The task SHALL be stored in memory.
- A confirmation message SHALL be displayed.

---

#### 3.2 View Tasks
- The system SHALL display all existing tasks.
- Each task SHALL display:
  - ID
  - Title
  - Completion status
- The system SHALL indicate completed vs incomplete tasks clearly.
- If no tasks exist, an informative message SHALL be shown.

---

#### 3.3 Update Task
- The system SHALL allow updating an existing task by ID.
- The user MAY update the title, description, or both.
- The task ID SHALL remain unchanged.
- If the task ID does not exist, an error message SHALL be shown.
- A success message SHALL confirm updates.

---

#### 3.4 Delete Task
- The system SHALL allow deleting a task by ID.
- The task SHALL be removed from memory.
- If the task ID does not exist, an error message SHALL be shown.
- A confirmation message SHALL be displayed upon success.

---

#### 3.5 Mark Task Complete / Incomplete
- The system SHALL allow toggling a task's completion status by ID.
- Completed tasks SHALL become incomplete when toggled again.
- If the task ID does not exist, an error message SHALL be shown.
- A confirmation message SHALL display the updated status.

---

### 4. CLI Interaction
- The system SHALL provide a simple menu-based CLI.
- User input SHALL be validated.
- Invalid input SHALL NOT crash the application.

---

### 5. Data Lifecycle
- All tasks SHALL exist only in memory.
- All tasks SHALL be lost when the application exits.

---

### 6. Non-Functional Requirements
- The system SHALL be deterministic.
- The system SHALL be easy to read and maintain.
- The system SHALL prioritize clarity over optimization.
```

## Response snapshot

# Feature Specification: Todo CLI Application

**Feature Branch**: `1-todo-cli-app`
**Created**: 2025-12-28
**Status**: Draft
**Input**: User description: "Phase I – Todo In-Memory Console Application"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add and View Tasks (Priority: P1)

A user wants to create and track their todo tasks using a command-line interface. The user should be able to add new tasks with titles and optional descriptions, then view all their tasks in a clear format.

**Why this priority**: This is the core functionality of a todo application - users need to be able to create and see their tasks to derive any value from the application.

**Independent Test**: Can be fully tested by adding a task and then viewing the list of tasks to confirm the task was stored and displayed correctly.

**Acceptance Scenarios**:
1. **Given** user is at the main menu, **When** user selects "Add Task" and enters a title, **Then** a new task is created with a unique ID and shown in the task list
2. **Given** user has added tasks, **When** user selects "View Tasks", **Then** all tasks are displayed with their ID, title, and completion status

---

### User Story 2 - Update and Delete Tasks (Priority: P2)

A user wants to modify or remove existing tasks. The user should be able to update the title or description of a task by its ID, or delete a task entirely.

**Why this priority**: Once users have tasks created, they need the ability to modify or remove them as their needs change.

**Independent Test**: Can be tested by creating a task, updating its details, and verifying the changes persist, or deleting a task and confirming it no longer appears in the list.

**Acceptance Scenarios**:
1. **Given** user has existing tasks, **When** user selects "Update Task" and provides a valid ID with new details, **Then** the task is updated with the new information
2. **Given** user has existing tasks, **When** user selects "Delete Task" and provides a valid ID, **Then** the task is removed from the system

---

### User Story 3 - Mark Tasks Complete/Incomplete (Priority: P3)

A user wants to track the completion status of their tasks. The user should be able to mark tasks as complete or incomplete by their ID.

**Why this priority**: This allows users to track progress and organize their work, which is a key feature of todo applications.

**Independent Test**: Can be tested by marking a task as complete and verifying its status changes, then toggling it back to incomplete.

**Acceptance Scenarios**:
1. **Given** user has an incomplete task, **When** user selects "Mark Complete" and provides a valid ID, **Then** the task status changes to completed
2. **Given** user has a completed task, **When** user selects "Mark Incomplete" and provides a valid ID, **Then** the task status changes to incomplete

---

### Edge Cases

- What happens when a user tries to update/delete/mark a task that doesn't exist?
- How does system handle empty or invalid input when adding tasks?
- What happens when all tasks are deleted and user tries to view tasks?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add new tasks with a required title and optional description
- **FR-002**: System MUST assign a unique ID to each task automatically
- **FR-003**: System MUST display all tasks with their ID, title, and completion status
- **FR-004**: System MUST allow users to update existing tasks by ID
- **FR-005**: System MUST allow users to delete existing tasks by ID
- **FR-006**: System MUST allow users to toggle the completion status of tasks by ID
- **FR-007**: System MUST reject tasks with empty titles
- **FR-008**: System MUST provide clear error messages when invalid task IDs are used
- **FR-009**: System MUST maintain all data in memory only (no persistence)
- **FR-010**: System MUST provide a simple menu-based CLI interface

### Key Entities

- **Task**: Represents a single unit of work with id (integer), title (string), description (optional string), and completed (boolean)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new task in under 30 seconds
- **SC-002**: All core operations (add, view, update, delete, mark complete) complete in under 2 seconds
- **SC-003**: 100% of user operations result in appropriate success or error messages
- **SC-004**: Users can successfully complete all basic todo management tasks without crashes

## Outcome

- ✅ Impact: Created comprehensive specification for Todo CLI application
- 🧪 Tests: none
- 📁 Files: Created specs/1-todo-cli-app/spec.md and specs/1-todo-cli-app/checklists/requirements.md
- 🔁 Next prompts: Ready for feature planning with /sp.plan
- 🧠 Reflection: Specification captures all required functionality from user requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature planning with /sp.plan