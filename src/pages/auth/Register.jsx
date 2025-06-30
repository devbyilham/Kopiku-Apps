import { useState } from "react";
import { AuthAPI } from "../../services/AuthAPI";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data, error } = await AuthAPI.register(
      formData.email,
      formData.password
    );

    if (error) {
      const msg =
        error.error_description || error.message || "Register failed.";
      setError("Register failed: " + msg);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins]">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Create Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg"
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#f08c50] hover:bg-[#d9773a] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
