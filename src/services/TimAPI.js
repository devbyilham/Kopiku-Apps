import axios from 'axios';

// PERHATIAN: Pastikan API_URL dan API_KEY ini benar untuk tabel "tim" Anda di Supabase,
// Karena di contoh sebelumnya Anda menggunakan URL dan Key untuk "faq".
// Mungkin perlu disesuaikan dengan data Supabase tim/karyawan Anda.
const API_URL = "https://cjqdcyutitsbcgymcfrq.supabase.co/rest/v1/tim"; // <-- Sesuaikan dengan nama tabel TIM Anda
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcWRjeXV0aXRzYmNneW1jZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjM1NTEsImV4cCI6MjA2NTAzOTU1MX0.VqOO8YVWol_3CPibJwgL2zQmcwAwgm9XE-54Yj_FDVI"; // <-- Gunakan API Key yang benar untuk proyek Anda

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const TimAPI = {
    async fetchTim() {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    },

    async createTim(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    },

    async deleteTim(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    },

    async updateTim(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data;
    },

    async getTimById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    },
};