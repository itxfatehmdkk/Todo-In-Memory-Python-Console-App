import React from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, LaptopIcon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Determine which icon to show based on current theme
  const getIcon = () => {
    if (theme === 'light') {
      return <SunIcon className="h-5 w-5" />;
    } else if (theme === 'dark') {
      return <MoonIcon className="h-5 w-5" />;
    } else {
      return <LaptopIcon className="h-5 w-5" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;