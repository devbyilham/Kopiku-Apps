import axios from "axios";

const SUPABASE_URL = "https://avbxibrsozgpnspuvzrz.supabase.co";
const API_URL = `${SUPABASE_URL}/rest/v1/booking`;
const API_KEY = "sb_publishable_-zMWSPmtjojiBxJiykztZg_49vaYSLX";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const BookingAPI = {
  async fetchBooking() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createBooking(data) {
    const response = await axios.post(API_URL, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  async deleteBooking(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateBooking(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  async getBookingById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data?.[0] ?? null;
  },
};
