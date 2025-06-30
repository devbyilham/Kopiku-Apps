import { useState } from "react";
import { AuthAPI } from "../../services/AuthAPI";
import { NavLink } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null); // untuk notifikasi
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { data, error } = await AuthAPI.resetPassword(email);
    if (error) {
      setError(error.message || "Failed to send reset link.");
    } else {
      setMessage("Reset link sent! Please check your email.");
    }
  };

  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins] mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Forgot Password?
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
            required
          />
        </div>

        {/* Notifikasi */}
        {message && (
          <div className="mb-4 text-green-300 text-sm text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-300 text-sm text-center">{error}</div>
        )}

        <div className="text-center mb-1">
          <NavLink
            to="/"
            className="text-white hover:text-[#d9773a] hover:underline text-sm transition duration-200"
          >
            Already reset password?
          </NavLink>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f08c50] hover:bg-[#d9773a] text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-300"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
