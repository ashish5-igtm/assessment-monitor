// Mock assessment service - replace with actual API calls
const mockAssessments = [
  {
    id: 1,
    title: 'Module 1 Quiz',
    subject: 'Mathematics',
    date: '2024-02-15',
    score: 85,
    totalPoints: 100,
    status: 'completed',
    questions: 20,
    timeLimit: 60
  },
  {
    id: 2,
    title: 'Science Project',
    subject: 'Physics',
    date: '2024-02-20',
    score: 92,
    totalPoints: 100,
    status: 'completed',
    questions: 15,
    timeLimit: 120
  }
];

export const assessmentService = {
  // Get all assessments for a student
  getStudentAssessments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAssessments), 500);
    });
  },

  // Get assessment details
  getAssessmentById: async (assessmentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assessment = mockAssessments.find(a => a.id === assessmentId);
        resolve(assessment || null);
      }, 300);
    });
  },

  // Submit assessment answers
  submitAssessment: async (assessmentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          assessmentId,
          submittedAt: new Date(),
          message: 'Assessment submitted successfully'
        });
      }, 1000);
    });
  },

  // Create new assessment
  createAssessment: async (assessmentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          ...assessmentData,
          createdAt: new Date()
        });
      }, 500);
    });
  },

  // Get performance analytics
  getPerformanceAnalytics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          averageScore: 88.5,
          totalAssessments: 10,
          completedAssessments: 8,
          pendingAssessments: 2,
          improvementRate: 5.2,
          strongSubjects: ['Mathematics', 'Physics'],
          weakSubjects: ['History']
        });
      }, 600);
    });
  }
};
