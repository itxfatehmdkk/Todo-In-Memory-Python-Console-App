import React from 'react';
import { PlusIcon } from 'lucide-react';

interface AddTaskFABProps {
  onClick: () => void;
  className?: string;
}

const AddTaskFAB: React.FC<AddTaskFABProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${className}`}
      aria-label="Add new task"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};

export default AddTaskFAB;