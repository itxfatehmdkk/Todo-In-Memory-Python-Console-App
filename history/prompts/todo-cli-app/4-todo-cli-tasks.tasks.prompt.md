---
id: 4
title: Todo CLI Tasks
stage: tasks
date: 2025-12-28
surface: agent
model: Claude Sonnet 4.5
feature: todo-cli-app
branch: 1-todo-cli-app
user: Fateh Mohammad
command: sp.tasks
labels: [tasks, todo-app, implementation]
links:
  spec: specs/1-todo-cli-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-todo-cli-app/tasks.md
tests:
 - none
---

## Prompt

```text
$ARGUMENTS
```

## Response snapshot

---
description: "Task list for Todo CLI Application implementation"
---

# Tasks: Todo CLI Application

**Input**: Design documents from `/specs/1-todo-cli-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan in src/todo_app/
- [ ] T002 Initialize Python project with __init__.py files in src/todo_app/
- [ ] T003 [P] Create tests directory structure with __init__.py files

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create Task model in src/todo_app/models.py with id, title, description, completed attributes
- [ ] T005 Create in-memory storage class in src/todo_app/storage.py with add, get_all, update, delete, toggle methods
- [ ] T006 Create CLI interface framework in src/todo_app/cli.py with menu display and input handling
- [ ] T007 Create main application entry point in src/todo_app/main.py
- [ ] T008 Add error handling and validation framework

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---
## Phase 3: User Story 1 - Add and View Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to create and view todo tasks with a title and optional description

**Independent Test**: Can be fully tested by adding a task and then viewing the list of tasks to confirm the task was stored and displayed correctly.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Create Task model tests in tests/test_models.py
- [ ] T010 [P] [US1] Create storage functionality tests in tests/test_storage.py

### Implementation for User Story 1

- [ ] T011 [P] [US1] Implement Task model with validation in src/todo_app/models.py
- [ ] T012 [P] [US1] Implement add_task method in src/todo_app/storage.py
- [ ] T013 [US1] Implement get_all_tasks method in src/todo_app/storage.py
- [ ] T014 [US1] Implement add task CLI command in src/todo_app/cli.py
- [ ] T015 [US1] Implement view tasks CLI command in src/todo_app/cli.py
- [ ] T016 [US1] Integrate add/view functionality in main.py
- [ ] T017 [US1] Add input validation for empty titles as per FR-007

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---
## Phase 4: User Story 2 - Update and Delete Tasks (Priority: P2)

**Goal**: Enable users to modify or remove existing tasks by ID

**Independent Test**: Can be tested by creating a task, updating its details, and verifying the changes persist, or deleting a task and confirming it no longer appears in the list.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Create update/delete storage tests in tests/test_storage.py
- [ ] T019 [P] [US2] Create CLI command tests for update/delete in tests/test_cli.py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Implement update_task method in src/todo_app/storage.py
- [ ] T021 [P] [US2] Implement delete_task method in src/todo_app/storage.py
- [ ] T022 [US2] Implement update task CLI command in src/todo_app/cli.py
- [ ] T023 [US2] Implement delete task CLI command in src/todo_app/cli.py
- [ ] T024 [US2] Integrate update/delete functionality in main.py
- [ ] T025 [US2] Add validation for existing task IDs as per FR-008

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---
## Phase 5: User Story 3 - Mark Tasks Complete/Incomplete (Priority: P3)

**Goal**: Enable users to track completion status of tasks by toggling completion state

**Independent Test**: Can be tested by marking a task as complete and verifying its status changes, then toggling it back to incomplete.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US3] Create toggle completion tests in tests/test_storage.py
- [ ] T027 [P] [US3] Create CLI command tests for toggle in tests/test_cli.py

### Implementation for User Story 3

- [ ] T028 [P] [US3] Implement toggle_task_completion method in src/todo_app/storage.py
- [ ] T029 [US3] Implement toggle task CLI command in src/todo_app/cli.py
- [ ] T030 [US3] Integrate toggle functionality in main.py
- [ ] T031 [US3] Add validation for existing task IDs for toggle operation

**Checkpoint**: All user stories should now be independently functional

---
## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T032 [P] Add comprehensive error handling and user-friendly messages
- [ ] T033 [P] Implement edge case handling for empty task lists
- [ ] T034 Add input validation for all user inputs
- [ ] T035 [P] Add documentation comments to all functions
- [ ] T036 Create README with usage instructions
- [ ] T037 Run complete application test to verify all functionality

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---
## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Create Task model tests in tests/test_models.py"
Task: "Create storage functionality tests in tests/test_storage.py"

# Launch all models for User Story 1 together:
Task: "Implement Task model with validation in src/todo_app/models.py"
Task: "Implement add_task method in src/todo_app/storage.py"
```

---
## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---
## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Outcome

- ✅ Impact: Created comprehensive task list for Todo CLI application implementation
- 🧪 Tests: none
- 📁 Files: Created specs/1-todo-cli-app/tasks.md with 37 tasks organized by user story
- 🔁 Next prompts: Ready for implementation of tasks
- 🧠 Reflection: Tasks organized by user story with clear dependencies and parallel execution opportunities

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementing tasks starting with T001