import { useState } from "react";
import TeamData from "../data/Team.json"
import { Pencil, Trash2, PlusCircle, Save } from "lucide-react";

export default function TeamManager() {
  const [teamList, setTeamList] = useState(TeamData);
  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setTeamList(
        teamList.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        )
      );
      setEditId(null);
    } else {
      const newMember = {
        id: teamList.length + 1,
        ...form,
      };
      setTeamList([...teamList, newMember]);
    }

    setForm({ nama: "", jabatan: "", foto: "" });
  };

  const handleEdit = (member) => {
    setForm({ nama: member.nama, jabatan: member.jabatan, foto: member.foto });
    setEditId(member.id);
  };

  const handleDelete = (id) => {
    setTeamList(teamList.filter((member) => member.id !== id));
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

        {/* Form Tim */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#6c4432] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
          <h2 className="text-xl font-semibold text-center">
            {editId ? "✏️ Edit Anggota Tim" : "➕ Tambah Anggota Tim"}
          </h2>
          <input
            type="text"
            name="nama"
            placeholder="🧑 Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
          <input
            type="text"
            name="jabatan"
            placeholder="🏷️ Jabatan"
            value={form.jabatan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
          <input
            type="url"
            name="foto"
            placeholder="🌐 URL Foto (opsional)"
            value={form.foto}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition"
          >
            {editId ? <Save size={18} /> : <PlusCircle size={18} />}
            {editId ? "Simpan Perubahan" : "Tambah Anggota"}
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari anggota tim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-white"
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
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-yellow-300 hover:text-yellow-400 transition"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
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
