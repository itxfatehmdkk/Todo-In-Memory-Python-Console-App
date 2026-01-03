export interface ThemePreference {
  theme: 'light' | 'dark' | 'system';
}

export interface TaskPriority {
  priority: 'low' | 'medium' | 'high';
}

export interface TaskStatus {
  completed: boolean;
}

export interface TaskPosition {
  position: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  position: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  theme_preference: 'light' | 'dark' | 'system';
  profile_image_url?: string;
}

export interface Theme {
  user_id: string;
  theme_mode: 'light' | 'dark';
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface TaskFilter {
  status?: 'all' | 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'all';
}

export interface TaskSort {
  field: 'title' | 'created_at' | 'due_date' | 'priority';
  order: 'asc' | 'desc';
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface FilterOption {
  id: string;
  label: string;
  value: 'all' | 'pending' | 'completed';
}

export interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  filter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}