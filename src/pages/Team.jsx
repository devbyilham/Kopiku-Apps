import { useState, useEffect } from "react"; // Tambahkan useEffect
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
// import TeamData from "../data/Team.json"; // Hapus atau komentari ini
import { TimAPI } from "../services/TimAPI"; // <-- Import TimAPI Anda

export default function Team() {
  const [teamList, setTeamList] = useState([]); // Awalnya kosong, akan diisi dari API
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(""); // State untuk error
  const [success, setSuccess] = useState(""); // State untuk pesan sukses

  // Memuat data tim saat komponen pertama kali di-render
  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Fungsi untuk memuat data tim dari API
  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      setError("");
      // Panggil fungsi untuk mengambil semua anggota tim dari API
      const data = await TimAPI.fetchTim(); // Menggunakan fetchTim sesuai TimAPI
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

        await TimAPI.deleteTim(id); // Menggunakan deleteTim sesuai TimAPI
        setSuccess("Anggota tim berhasil dihapus!");
        setTimeout(() => setSuccess(""), 3000); // Sembunyikan pesan setelah 3 detik
        loadTeamMembers(); // Muat ulang daftar tim setelah penghapusan
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

        {/* Pesan Error dan Sukses sederhana */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {success}
          </div>
        )}

        {/* Tombol Tambah dengan Link */}
        <Link
          to="/team/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition shadow-md"
        >
          <PlusCircle size={18} /> Tambah Anggota Tim
        </Link>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Cari anggota tim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />

        {/* Loading Indicator */}
        {loading && (
          <div className="p-8 text-center text-white text-lg font-medium">
            Memuat anggota tim...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTeam.length === 0 && !error && (
          <p className="text-center text-white/70 col-span-full p-8 text-lg font-medium">
            Tidak ada anggota tim ditemukan.
          </p>
        )}

        {/* Error State when data is empty */}
        {!loading && filteredTeam.length === 0 && error && (
          <div className="p-8 text-center text-red-500 text-lg font-medium">
            Terjadi Kesalahan. Coba lagi nanti.
          </div>
        )}

        {/* List Tim */}
        {!loading && filteredTeam.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-lg bg-[#6c4432] hover:shadow-lg transition duration-200 border border-white/10 flex gap-4 items-center shadow-md"
              >
                <img
                  src={member.foto || "https://via.placeholder.com/80"} // Fallback image
                  alt={member.nama}
                  className="w-20 h-20 object-cover rounded-full border-2 border-white/30"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">
                    {member.nama}
                  </h3>{" "}
                  {/* Pastikan teks nama kontras */}
                  <p className="text-sm text-gray-300">{member.jabatan}</p>{" "}
                  {/* Kontras lebih baik */}
                  <div className="mt-2 flex gap-2">
                    {/* Link ke halaman edit */}
                    <Link
                      to={`/team/${member.id}`} // Asumsikan Anda memiliki rute ini
                      className="text-yellow-300 hover:text-yellow-400 transition"
                      title="Edit"
                    >
                      <Pencil size={20} />
                    </Link>

                    {/* Tombol Hapus */}
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
