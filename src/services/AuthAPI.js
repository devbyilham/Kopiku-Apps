import axios from "axios";

const SUPABASE_URL = "https://cjqdcyutitsbcgymcfrq.supabase.co"; 
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcWRjeXV0aXRzYmNneW1jZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjM1NTEsImV4cCI6MjA2NTAzOTU1MX0.VqOO8YVWol_3CPibJwgL2zQmcwAwgm9XE-54Yj_FDVI";

export const AuthAPI = {
  register: async (email, password) => {
    try {
      const response = await axios.post(
        `${SUPABASE_URL}/auth/v1/signup`,
        { email, password },
        {
          headers: {
            apikey: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data || { message: "Register failed." },
      };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        { email, password },
        {
          headers: {
            apikey: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data || { message: "Login failed." },
      };
    }
  },

  resetPassword: async (email) => {
    try {
      const response = await axios.post(
        `${SUPABASE_URL}/auth/v1/recover`,
        { email },
        {
          headers: {
            apikey: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data || { message: "Reset password failed." },
      };
    }
  },

  updatePassword: async (accessToken, newPassword) => {
    try {
      const response = await axios.put(
        `${SUPABASE_URL}/auth/v1/user`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            apikey: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err.response?.data || { message: "Update password failed." },
      };
    }
  },
};
