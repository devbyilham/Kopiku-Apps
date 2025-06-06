import { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TeamData from "../data/Team.json";

export default function Team() {
  const [teamList, setTeamList] = useState(TeamData);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    const confirm = window.confirm("Yakin ingin menghapus anggota ini?");
    if (confirm) {
      setTeamList(teamList.filter((member) => member.id !== id));
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

        {/* Tombol Tambah dengan Link */}
        <Link
          to="/team/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition"
        >
          <PlusCircle size={18} /> Tambah Anggota Tim
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari anggota tim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-white bg-[#6c4432] border border-white/10"
        />

        {/* List Tim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-lg bg-[#6c4432] hover:shadow-lg transition duration-200 border border-white/10 flex gap-4 items-center"
            >
              <img
                src={member.foto || "https://via.placeholder.com/80"}
                alt={member.nama}
                className="w-20 h-20 object-cover rounded-full border-2 border-white/30"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{member.nama}</h3>
                <p className="text-sm text-gray-200">{member.jabatan}</p>
                <div className="mt-2 flex gap-2">
                  {/* Link ke halaman edit */}
                  <Link
                    to={`/team/${member.id}`}
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
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredTeam.length === 0 && (
            <p className="text-center text-gray-300 col-span-full">
              Tidak ada anggota tim ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
