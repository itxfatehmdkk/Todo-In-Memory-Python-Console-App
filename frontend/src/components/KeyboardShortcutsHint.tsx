import React from 'react';

interface KeyboardShortcutsHintProps {
  shortcuts?: Array<{ key: string; description: string }>;
}

const KeyboardShortcutsHint: React.FC<KeyboardShortcutsHintProps> = ({
  shortcuts = [
    { key: 'N', description: 'Add new task' },
    { key: 'S', description: 'Focus search' },
    { key: 'Esc', description: 'Close modal' },
  ]
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Keyboard Shortcuts</h4>
      <div className="space-y-1">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
              {shortcut.key}
            </kbd>
            <span className="ml-2">{shortcut.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardShortcutsHint;