import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Page Imports
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AddAssessment from './pages/teacher/AddAssessment';
import ViewStudents from './pages/teacher/ViewStudents';
import StudentDashboard from './pages/student/StudentDashboard';
import MyProgress from './pages/student/MyProgress';

// Routes Component
function AppContent() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
        path="/teacher/students" 
        element={
          <ProtectedRoute requiredRole="teacher">
            <ViewStudents />
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
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;