/** API service for the Todo Full-Stack Web Application. */

import { Task, TaskCreate, TaskUpdate } from '../types';

// Define user types
interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Helper function to get JWT token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

// Helper function to create headers with JWT
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Get current user ID from token (simplified)
const getCurrentUserId = (): string | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    // In a real implementation, you would decode the JWT properly
    // This is a simplified approach for the implementation
    const payload = token.split('.')[1];
    if (!payload) return null;

    const decoded = JSON.parse(atob(payload));
    return decoded.user_id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Authentication API functions
export const authApi = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      // Store the token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt_token', data.token);
      }

      return data as LoginResponse;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Signup function
  signup: async (userData: SignupData): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Signup failed: ${response.statusText}`);
      }

      const data = await response.json();
      // Store the token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt_token', data.token);
      }

      return data as LoginResponse;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Logout function
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt_token');
      return !!token;
    }
    return false;
  },

  // Get current user from token
  getCurrentUser: (): User | null => {
    const token = getAuthToken();
    if (!token) return null;

    try {
      // In a real implementation, you would decode the JWT properly
      // This is a simplified approach for the implementation
      const payload = token.split('.')[1];
      if (!payload) return null;

      const decoded = JSON.parse(atob(payload));
      return {
        id: decoded.user_id || decoded.id,
        email: decoded.email,
        name: decoded.name || decoded.email?.split('@')[0] || 'User',
        created_at: decoded.created_at || new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};

// Task API functions
export const taskApi = {
  // Get all tasks for user
  getTasks: async (status?: string, sort?: string): Promise<Task[]> => {
    const userId = getCurrentUserId();
    if (!userId) {
      // Return empty array for unauthenticated users
      return [];
    }

    let url = `${API_BASE_URL}/api/${userId}/tasks`;
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status_filter', status); // Backend expects 'status_filter', not 'status'
    if (sort) params.append('sort', sort);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();
      // Check if data is an array (direct response) or object with tasks property
      if (Array.isArray(data)) {
        return data as Task[];
      }
      return data.tasks as Task[];
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData: TaskCreate): Promise<Task> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Invalid task data');
        }
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Get a specific task
  getTask: async (taskId: number): Promise<Task> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(`Failed to fetch task: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Update a task
  updateTask: async (taskId: number, taskData: TaskUpdate): Promise<Task> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(`Failed to update task: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId: number): Promise<void> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },

  // Toggle task completion
  toggleTaskCompletion: async (taskId: number): Promise<Task> => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again');
        }
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(`Failed to toggle task completion: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please make sure the backend server is running. Check that the API URL is correct and the server is accessible.');
      }
      throw error;
    }
  },
};