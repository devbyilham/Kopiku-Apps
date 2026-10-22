import axios from "axios";

const API_URL = "https://avbxibrsozgpnspuvzrz.supabase.co/rest/v1/user";
const API_KEY = "ISI_PUBLISHABLE_KEY_SUPABASE_BARU";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const UserAPI = {
  async fetchUser() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateUser(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async getUserById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  },
};
