import { createContext, useContext, useState, useEffect } from 'react';
import { studentService } from '../services/studentService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Failed to parse saved user:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Keep teacher mock for demonstration
    if (email === 'teacher@school.edu' && password === 'teacher123') {
      const userData = { email, role: 'teacher', name: 'Teacher' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    
    // Authenticate student via backend
    const studentData = await studentService.loginStudent({ email, password });
    const userData = { email: studentData.email, role: 'student', name: studentData.name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
