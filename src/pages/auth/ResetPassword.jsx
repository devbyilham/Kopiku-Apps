import { useState, useEffect } from "react";
import { resetPassword } from "../../services/AuthAPI";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
    } else {
      setMessage("Invalid or missing token.");
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password || !token) return;

    const { data, error } = await AuthAPI.updatePassword(token, password);
    if (error) {
      setMessage("Gagal reset password.");
    } else {
      setMessage("Password berhasil di-reset!");
    }
  };

  return (
    <div className="bg-[#8b5e45] p-8 rounded-2xl shadow-xl text-white w-full max-w-md mx-auto border border-[#a27154] font-[Poppins] mt-20">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Reset Password
      </h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg mb-4 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full px-4 py-3 bg-[#f4eae6] text-black rounded-lg mb-4 focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#f08c50] hover:bg-[#d9773a] text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-300"
        >
          Simpan Password Baru
        </button>
      </form>
    </div>
  );
}
