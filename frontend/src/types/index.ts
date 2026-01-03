/** Type definitions for the Todo Full-Stack Web Application. */

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UITask extends Task {
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  position?: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}