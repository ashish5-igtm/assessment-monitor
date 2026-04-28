import axios from 'axios';
import { apiBaseUrl } from '../config/api';

const API_BASE_URL = `${apiBaseUrl}/api/assessments`;

export const assessmentService = {
  // Get all assessments for a student
  getStudentAssessments: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
        console.error("Failed to fetch assessments from backend", error);
        return [];
    }
  },

  // Get assessment details
  getAssessmentById: async (assessmentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${assessmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch assessment ${assessmentId}`, error);
      return null;
    }
  },

  // Submit assessment answers
  submitAssessment: async (assessmentId) => {
    // This is still mocked for now as the backend purely stores assessments
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
    try {
      // Map dueDate to date to satisfy backend entity constraint
      const payload = {
        ...assessmentData,
        date: assessmentData.dueDate || assessmentData.date || new Date().toISOString().split('T')[0],
        status: 'pending' // default status
      };
      
      const response = await axios.post(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      console.error("Failed to create assessment", error);
      throw error;
    }
  },

  // Upload PDF for an assessment
  uploadAssessmentPdf: async (assessmentId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE_URL}/${assessmentId}/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to upload assessment PDF", error);
      throw error;
    }
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
