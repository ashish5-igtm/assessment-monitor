import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to={user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
              className="text-xl font-bold text-gray-900"
            >
              Assessment Monitor
            </Link>
            <div className="hidden md:flex ml-6 space-x-6">
              {user?.role === 'teacher' ? (
                <>
                  <Link to="/teacher/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                  <Link to="/teacher/add-assessment" className="text-gray-600 hover:text-gray-900">Add Assessment</Link>
                </>
              ) : (
                <>
                  <Link to="/student/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                  <Link to="/student/progress" className="text-gray-600 hover:text-gray-900">My Progress</Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-gray-700">Hello, {user?.name}</span>
            <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Logout</button>

            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="space-y-2">
            {user?.role === 'teacher' ? (
              <>
                <Link to="/teacher/dashboard" onClick={() => setOpen(false)} className="block text-gray-700">Dashboard</Link>
                <Link to="/teacher/add-assessment" onClick={() => setOpen(false)} className="block text-gray-700">Add Assessment</Link>
              </>
            ) : (
              <>
                <Link to="/student/dashboard" onClick={() => setOpen(false)} className="block text-gray-700">Dashboard</Link>
                <Link to="/student/progress" onClick={() => setOpen(false)} className="block text-gray-700">My Progress</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
