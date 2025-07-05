import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { TimAPI } from "../services/TimAPI";

import AlertBox from "../components/AlertBox"; // Import AlertBox
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Team() {
  const [teamList, setTeamList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Effect to hide the success alert after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Effect to hide the error alert after 3 seconds (added for consistency with success)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous error
      // No need to clear success here, it's handled by its useEffect
      const data = await TimAPI.fetchTim();
      setTeamList(data);
    } catch (err) {
      setError("Gagal memuat data tim.");
      console.error("Error loading team members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Removed window.confirm as requested ("tanpa alert")
    try {
      setLoading(true);
      setError(""); // Clear previous error
      setSuccess(""); // Clear previous success

      await TimAPI.deleteTim(id);
      setSuccess("Anggota tim berhasil dihapus!");
      // The setTimeout to clear success is handled by the dedicated useEffect
      loadTeamMembers(); // Reload list after deletion
    } catch (err) {
      setError(`Terjadi kesalahan saat menghapus: ${err.message}`); // More specific error
      console.error("Error deleting team member:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = teamList.filter((member) =>
    member.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl space-y-6 p-3">
        <h1 className="text-3xl font-bold text-center drop-shadow-md mb-8">
          Manajemen Tim
        </h1>

        {/* Render AlertBox for error messages (inline, as per original placement, now auto-hiding) */}
        {error && <AlertBox type="error">{error}</AlertBox>}

        {/* Render AlertBox for success messages (as a fixed toast) */}
        {success && (
          <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <AlertBox type="success">{success}</AlertBox>
          </div>
        )}

        <Link
          to="/team/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition shadow-md"
        >
          <PlusCircle size={18} /> Tambah Anggota Tim
        </Link>

        <input
          type="text"
          placeholder="🔍 Cari anggota tim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />

        {loading && (
          <div className="p-8 text-center text-white text-lg font-medium">
            <LoadingSpinner text="Memuat anggota tim..." />
          </div>
        )}

        {!loading && filteredTeam.length === 0 && !error && (
          <p className="text-center col-span-full p-8 text-lg font-medium">
            <EmptyState text="Tidak ada anggota tim ditemukan." />
          </p>
        )}

        {!loading && filteredTeam.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-lg bg-[var(--color-border)] hover:shadow-lg transition duration-200 border border-white/10 flex gap-4 items-center shadow-md"
              >
                <img
                  src={member.foto || "https://via.placeholder.com/80"}
                  alt={member.nama}
                  className="w-20 h-20 object-cover rounded-full border-2 border-white/30"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">
                    {member.nama}
                  </h3>
                  <p className="text-sm text-gray-300">{member.jabatan}</p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      to={`/team/${member.id}`}
                      className="text-yellow-300 hover:text-yellow-400 transition"
                      title="Edit"
                    >
                      <Pencil size={20} />
                    </Link>

                    <button
                      onClick={() => handleDelete(member.id)} // Directly calls handleDelete without window.confirm
                      className="text-red-400 hover:text-red-500 transition"
                      title="Hapus"
                      disabled={loading}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
