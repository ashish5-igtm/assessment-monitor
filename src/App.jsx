import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/common/Navbar';

// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/

// Page Imports
import Login from './pages/Login';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AddAssessment from './pages/teacher/AddAssessment';
import StudentDashboard from './pages/student/StudentDashboard';
import MyProgress from './pages/student/MyProgress';

// Routes Component
function AppContent() {
  return (
    <Routes>
      {/* Public Route */}
      <Route 
        path="/" 
        element={<Login />} 
      />

      {/* 👨‍🏫 Teacher Routes - Protected */}
      <Route 
        path="/teacher/dashboard" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/add-assessment" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <AddAssessment />
          </ProtectedRoute>
        } 
      />

      {/* 🎓 Student Routes - Protected */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/progress" 
        element={
          <ProtectedRoute requiredRole="student">
            <MyProgress />
          </ProtectedRoute>
        } 
      />

      {/* Catch-all redirect for unknown URLs */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;