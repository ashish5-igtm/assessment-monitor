// Utility functions for the application

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculatePercentage = (score, total) => {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
};

export const getScoreGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export const getScoreColor = (percentage) => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 70) return 'text-yellow-600';
  if (percentage >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const sortAssessmentsByDate = (assessments) => {
  return [...assessments].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const filterAssessmentsByStatus = (assessments, status) => {
  return assessments.filter(a => a.status === status);
};

export const calculateAverage = (scores) => {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b) / scores.length);
};
