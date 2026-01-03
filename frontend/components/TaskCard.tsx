import React from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@headlessui/react';
import { TrashIcon, PencilIcon } from 'lucide-react';
import { UITask } from '../src/types';

interface TaskCardProps {
  task: UITask;
  onToggle: (task: UITask) => void;
  onEdit: (task: UITask) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  // Determine priority color
  const priorityColor = task.priority === 'high'
    ? 'text-red-500 bg-red-100 dark:bg-red-900/30'
    : task.priority === 'medium'
      ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
      : task.priority === 'low'
        ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30'
        : 'text-gray-500 bg-gray-100 dark:bg-gray-700';

  // Determine status color
  const statusColor = task.completed
    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className={`p-4 rounded-lg border shadow-sm transition-all duration-200 ${statusColor}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mt-1 flex h-5 w-5 items-center justify-center rounded border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ui-checked:bg-blue-600 ui-checked:text-white ui-checked:border-blue-600"
        >
          {task.completed && (
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
            </svg>
          )}
        </Checkbox>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium truncate ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            {task.priority && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColor}`}>
                {task.priority}
              </span>
            )}
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
              {task.description}
            </p>
          )}

          {task.due_date && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit task"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete task"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;