import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthAPI } from "../../services/AuthAPI"; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await AuthAPI.login(
      formData.email,
      formData.password
    );

    if (error) {
      const message =
        error.error_description ||
        error.msg ||
        error.message ||
        "Unknown error";
      console.error("Login Error Response:", error);
      setError("Login failed: " + message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins]">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="flex justify-between text-sm">
          <NavLink
            to="/register"
            className="text-white hover:text-[#d9773a] hover:underline transition duration-200"
          >
            Create an account
          </NavLink>

          <NavLink
            to="/forgot"
            className="text-white hover:text-[#d9773a] hover:underline transition duration-200 mb-1"
          >
            Forgot Password?
          </NavLink>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] hover:bg-[#d9773a] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}
