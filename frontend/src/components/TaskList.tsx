/** Task List component for the Todo Full-Stack Web Application. */

import React, { useState, useEffect, useCallback } from 'react';
import TaskCard from '../../components/TaskCard';
import TaskForm from './TaskForm';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from './EmptyState';
import TaskFilter from './TaskFilter';
import TaskSearch from './TaskSearch';
import { Task, UITask } from '../types';
import { taskApi } from '../services/api';
import { toast } from 'sonner';

interface TaskListProps {
  userId: string | null;
  onAddTaskClick?: () => void; // Optional handler for unauthenticated users
}

const TaskList: React.FC<TaskListProps> = ({ userId, onAddTaskClick }) => {
  const [allTasks, setAllTasks] = useState<UITask[]>([]); // Store all tasks
  const [displayedTasks, setDisplayedTasks] = useState<UITask[]>([]); // Store filtered tasks to display
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<UITask | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('created_at');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch all tasks from the API
  const fetchAllTasks = async () => {
    if (!userId) {
      setLoading(false);
      return; // Show empty state for unauthenticated users
    }

    try {
      setLoading(true);
      const tasksData = await taskApi.getTasks(statusFilter, sortOption);
      setAllTasks(tasksData); // Store all tasks
      setDisplayedTasks(tasksData); // Initially display all tasks
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
      toast.error(`Failed to fetch tasks: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Apply search and filter to determine displayed tasks
  useEffect(() => {
    if (!userId) return;

    let result = [...allTasks]; // Start with all tasks

    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'completed') {
        result = result.filter(task => task.completed);
      } else if (statusFilter === 'pending') {
        result = result.filter(task => !task.completed);
      }
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        // Sort by created_at (newest first)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setDisplayedTasks(result);
  }, [allTasks, statusFilter, searchTerm, sortOption, userId]);

  // Load tasks on component mount and when filters change (excluding search)
  useEffect(() => {
    fetchAllTasks();
  }, [userId, statusFilter, sortOption]); // Don't include search term to avoid unnecessary API calls

  // Handle creating a new task
  const handleCreateTask = async (taskData: any) => {
    if (!userId) {
      // This shouldn't happen if the form isn't shown, but just in case
      setError('You must be logged in to create tasks');
      return;
    }

    try {
      const newTask = await taskApi.createTask(taskData);
      setAllTasks([...allTasks, newTask]); // Update the full task list
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      toast.error(`Failed to create task: ${errorMessage}`);
    }
  };

  // Handle updating a task
  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask || !userId) return;

    try {
      const updatedTask = await taskApi.updateTask(editingTask.id, taskData);
      setAllTasks(allTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setEditingTask(null);
      setShowForm(false);
      toast.success('Task updated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      toast.error(`Failed to update task: ${errorMessage}`);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: number) => {
    if (!userId) {
      setError('You must be logged in to delete tasks');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskApi.deleteTask(id);
      setAllTasks(allTasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      toast.error(`Failed to delete task: ${errorMessage}`);
    }
  };

  // Handle toggling task completion
  const handleToggleCompletion = async (taskOrId: number | Task) => {
    if (!userId) {
      setError('You must be logged in to update tasks');
      return;
    }

    // Extract ID from either task object or direct ID
    const id = typeof taskOrId === 'object' ? taskOrId.id : taskOrId;

    try {
      const updatedTask = await taskApi.toggleTaskCompletion(id);
      setAllTasks(allTasks.map(task =>
        task.id === id ? updatedTask : task
      ));
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task marked as pending!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      toast.error(`Failed to update task: ${errorMessage}`);
    }
  };

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    if (!userId) {
      setError('You must be logged in to edit tasks');
      return;
    }

    setEditingTask(task);
    setShowForm(true);
  };

  // Handle add task button click
  const handleAddTask = () => {
    if (!userId && onAddTaskClick) {
      onAddTaskClick(); // Trigger authentication modal
    } else if (userId) {
      // If there are active filters and no search term, clear filters and add task
      // If there's a search term or active filters, clear them first
      if (searchTerm || statusFilter !== 'all') {
        setSearchTerm('');
        setStatusFilter('all');
        return; // Don't show form when clearing filters
      }

      setEditingTask(null);
      setShowForm(true);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800">
            <LoadingSkeleton type="text" className="mb-2" />
            <LoadingSkeleton type="text" className="w-3/4 mb-2" />
            <LoadingSkeleton type="text" className="w-1/2 mb-3" />
            <div className="flex justify-end space-x-2">
              <LoadingSkeleton type="button" className="w-16 h-8" />
              <LoadingSkeleton type="button" className="w-16 h-8" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header with title and progress tracker */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>

            {/* Progress Tracker - only show if user is authenticated */}
            {userId && allTasks.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{allTasks.filter(t => t.completed).length} of {allTasks.length} tasks completed</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${allTasks.length > 0 ? (allTasks.filter(t => t.completed).length / allTasks.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddTask}
            className={`px-4 py-2 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              userId
                ? 'bg-green-600 focus:ring-green-500 hover:bg-green-700'
                : 'bg-blue-600 focus:ring-blue-500 hover:bg-blue-700'
            }`}
          >
            Add Task
          </button>
        </div>

      </div>

      {/* Filters and sorting - only show if user is authenticated */}
      {userId && (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by status:
            </label>
            <TaskFilter
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              loading={loading}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="sort-option" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort by:
            </label>
            <select
              id="sort-option"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="created_at">Created Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search tasks:
            </label>
            <TaskSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search tasks..."
            />
          </div>
        </div>
      )}

      {/* Task list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggleCompletion}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>

      {displayedTasks.length === 0 && (
        <EmptyState
          title={userId ? 'No tasks found' : 'Sign in to manage tasks'}
          description={userId
            ? searchTerm
              ? 'No tasks match your search. Try a different search term.'
              : statusFilter !== 'all'
                ? `No ${statusFilter} tasks. Change your filter or create a new task.`
                : 'Get started by creating a new task.'
            : 'Sign in to create and manage your tasks.'}
          action={
            <button
              onClick={handleAddTask}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                userId
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {userId ? (searchTerm || statusFilter !== 'all' ? 'Clear Filters' : 'Add your first task') : 'Sign in to get started'}
            </button>
          }
        />
      )}

      {/* Task form modal */}
      {showForm && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;