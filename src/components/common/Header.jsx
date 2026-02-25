import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Monitor</h1>
          <p className="text-sm text-gray-500">
            Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
