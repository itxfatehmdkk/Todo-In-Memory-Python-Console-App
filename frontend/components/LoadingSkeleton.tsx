import React from 'react';

interface LoadingSkeletonProps {
  type?: 'task' | 'card' | 'text' | 'avatar' | 'button';
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  className = ''
}) => {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md";

  const getTypeClasses = () => {
    switch (type) {
      case 'task':
        return "h-24 w-full";
      case 'card':
        return "h-32 w-full";
      case 'text':
        return "h-4 w-full";
      case 'avatar':
        return "h-10 w-10 rounded-full";
      case 'button':
        return "h-10 w-24 rounded";
      default:
        return "h-24 w-full";
    }
  };

  return (
    <div className={`${baseClasses} ${getTypeClasses()} ${className}`} />
  );
};

export default LoadingSkeleton;