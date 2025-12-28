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