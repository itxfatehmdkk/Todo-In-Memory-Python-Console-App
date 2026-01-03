/** Dashboard page for the Todo Full-Stack Web Application. */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getCurrentUser, logout } from '../src/services/auth';
import TaskList from '../src/components/TaskList';
import Header from '../src/components/Header';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleAddTaskClick = () => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setShowAuthModal(false);
    }
  };

  // If no user but modal is not shown, show minimal header
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Header */}
        <Header />

        {/* Main content - pass onAddTaskClick handler and null userId */}
        <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TaskList userId={null} onAddTaskClick={handleAddTaskClick} />
        </main>

        {/* Authentication Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">You must sign up or log in to use the Todo app.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleAuthModalClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If user is authenticated, show full interface
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header with theme toggle */}
      <Header user={{ name: user.name || user.email }} onLogout={handleLogout} />

      {/* Main content */}
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TaskList userId={user.id} onAddTaskClick={handleAddTaskClick} />
      </main>
    </div>
  );
};

export default DashboardPage;