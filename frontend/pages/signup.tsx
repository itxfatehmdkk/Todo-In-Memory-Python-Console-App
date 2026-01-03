import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../src/services/auth';
import Header from '../components/Header';
import AuthForm from '../src/components/AuthForm';

const SignupPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setError(null);
    setLoading(true);

    try {
      await signup({ email: data.email, password: data.password, name: data.name });
      router.push('/'); // Redirect to dashboard after successful signup
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <Header />

      {/* Centered Form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Get started with your free account
            </p>
          </div>

          {/* Auth Form for Signup */}
          <AuthForm type="signup" onSubmit={handleSubmit} loading={loading} />

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900/30 dark:border-red-700 dark:text-red-200 mt-4">
              {error}
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 rounded"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;