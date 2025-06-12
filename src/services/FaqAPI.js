import axios from "axios";

const API_URL = "https://cjqdcyutitsbcgymcfrq.supabase.co/rest/v1/faq";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcWRjeXV0aXRzYmNneW1jZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjM1NTEsImV4cCI6MjA2NTAzOTU1MX0.VqOO8YVWol_3CPibJwgL2zQmcwAwgm9XE-54Yj_FDVI";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const FaqAPI = {
  async fetchFaqs() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createFaq(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteFaq(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateFaq(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async getFaqById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  },
};
