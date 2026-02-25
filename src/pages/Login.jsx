import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Please enter an email');
      }
      if (!password) {
        throw new Error('Please enter a password');
      }

      const user = login(email, password);

      // Redirect based on role
      if (user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Assessment Monitor</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to track learning outcomes and progress.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@school.edu"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">Try: teacher@school.edu</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">Try: teacher123</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-4 border-t">
          <p className="text-xs text-center text-gray-600 mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium text-gray-900">Teacher</p>
              <p className="text-gray-600">teacher@school.edu / teacher123</p>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium text-gray-900">Student</p>
              <p className="text-gray-600">student@school.edu / student123</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}