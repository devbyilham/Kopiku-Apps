import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SUPABASE_URL = "https://cjqdcyutitsbcgymcfrq.supabase.co"; // ganti jika perlu
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcWRjeXV0aXRzYmNneW1jZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjM1NTEsImV4cCI6MjA2NTAzOTU1MX0.VqOO8YVWol_3CPibJwgL2zQmcwAwgm9XE-54Yj_FDVI";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");
    if (!accessToken) {
      setError("Invalid or missing token.");
    } else {
      setToken(accessToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `${SUPABASE_URL}/auth/v1/user`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Password updated successfully. You can now log in.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to update password. Try again.");
    }
  };

  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins] mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg"
            required
          />
        </div>

        {error && (
          <div className="text-red-300 text-sm mb-4 text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-300 text-sm mb-4 text-center">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#f08c50] hover:bg-[#d9773a] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
          disabled={!token}
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
