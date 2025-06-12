import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { TimAPI } from "../services/TimAPI";

import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Team() {
  const [teamList, setTeamList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError("");
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
    const confirmDelete = window.confirm("Yakin ingin menghapus anggota ini?");
    if (confirmDelete) {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        await TimAPI.deleteTim(id);
        setSuccess("Anggota tim berhasil dihapus!");
        setTimeout(() => setSuccess(""), 3000);
        loadTeamMembers();
      } catch (err) {
        setError(`Terjadi kesalahan: ${err.message}`);
        console.error("Error deleting team member:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredTeam = teamList.filter((member) =>
    member.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold text-center drop-shadow-md mb-8">
          👥 Manajemen Tim/Karyawan
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {success}
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
          className="w-full p-2 rounded text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
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

        {!loading && filteredTeam.length === 0 && error && (
          <div className="p-8 text-center text-red-500 text-lg font-medium">
            <EmptyState text={`${error} Coba lagi nanti.`} />
          </div>
        )}

        {!loading && filteredTeam.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-lg bg-[#6c4432] hover:shadow-lg transition duration-200 border border-white/10 flex gap-4 items-center shadow-md"
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
                      onClick={() => handleDelete(member.id)}
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
