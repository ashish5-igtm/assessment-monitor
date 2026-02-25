import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Logged in as: <span className="font-medium">{user?.email}</span>
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
