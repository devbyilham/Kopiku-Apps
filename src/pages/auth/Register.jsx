import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins]">
      <h2 className="text-3xl font-semibold mb-6 text-center">Create Account</h2>

      <form>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f08c50] placeholder-gray-600"
          />
        </div>

        <div className="text-center mb-1">
          <NavLink
            to="/login"
            className="text-white hover:text-[#d9773a] hover:underline text-sm transition duration-200"
          >
            Already have an account?
          </NavLink>
        </div>

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
