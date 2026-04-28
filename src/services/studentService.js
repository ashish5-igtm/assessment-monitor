import axios from 'axios';
import { apiBaseUrl } from '../config/api';

const API_BASE_URL = `${apiBaseUrl}/api/students`;

export const studentService = {
  // Get all registered students
  getAllStudents: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch students from backend", error);
      return [];
    }
  },

  // Register a new student
  registerStudent: async (studentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, studentData);
      return response.data;
    } catch (error) {
      console.error("Failed to register student", error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      }
      throw new Error("Failed to register due to a server error.");
    }
  },

  // Login a student
  loginStudent: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Failed to login student", error);
      if (error.response && error.response.data) {
        throw new Error(typeof error.response.data === 'string' ? error.response.data : error.response.data.message || "Invalid credentials");
      }
      throw new Error("Failed to login due to a server error.");
    }
  }
};
