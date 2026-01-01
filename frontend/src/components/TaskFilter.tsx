import React from 'react';

interface TaskFilterProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  loading?: boolean;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ statusFilter, onStatusFilterChange, loading = false }) => {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex rounded-md shadow-sm">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => !loading && onStatusFilterChange(option.value)}
          disabled={loading}
          className={`flex-1 px-4 py-2 text-sm font-medium border-t border-b border-r first:rounded-l-md first:border-l last:rounded-r-md transition-colors ${
            statusFilter === option.value
              ? 'bg-blue-600 text-white border-blue-600 shadow-inner'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          aria-pressed={statusFilter === option.value}
        >
          <span className={statusFilter === option.value ? 'font-semibold' : ''}>
            {option.label}
            {loading && statusFilter === option.value && (
              <span className="ml-1">...</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;