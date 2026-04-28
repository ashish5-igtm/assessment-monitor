import axios from 'axios';
import { apiBaseUrl } from '../config/api';

const API_BASE_URL = `${apiBaseUrl}/api/teachers`;

export const teacherService = {
  registerTeacher: async (teacherData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, teacherData);
      return response.data;
    } catch (error) {
      console.error("Failed to register teacher", error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      }
      throw new Error("Failed to register due to a server error.");
    }
  },

  loginTeacher: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Failed to login teacher", error);
      if (error.response && error.response.data) {
        throw new Error(typeof error.response.data === 'string' ? error.response.data : error.response.data.message || "Invalid credentials");
      }
      throw new Error("Failed to login due to a server error.");
    }
  }
}
