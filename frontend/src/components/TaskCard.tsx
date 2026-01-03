/** Enhanced Task Card component for the Todo Full-Stack Web Application. */

import React from 'react';
import { Task } from '../types';
import { TaskCardProps } from '../types/ui';
import { motion } from 'framer-motion';
import { Checkbox } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        w-full p-4 rounded-lg border shadow-sm transition-all duration-200 ease-in-out
        ${task.completed
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:shadow-md dark:bg-opacity-20'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'}
        hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-xl
      `}
    >
      <div className="flex justify-between items-start min-w-0">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="mt-1 flex h-5 w-5 items-center justify-center rounded border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ui-checked:bg-blue-600 ui-checked:text-white ui-checked:border-blue-600"
          >
            {task.completed && <CheckIcon className="h-4 w-4" />}
          </Checkbox>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold truncate ${task.completed ? 'line-through text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm break-words line-clamp-2">{task.description}</p>
            )}
            <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(task.created_at).toLocaleDateString()}
                </p>
                {task.due_date && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              {task.priority && (
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {task.priority}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-4 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;