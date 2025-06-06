import { useParams, useNavigate } from "react-router-dom";
import TeamData from "../data/Team.json";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });

  useEffect(() => {
    if (isEdit) {
      const member = TeamData.find((m) => m.id === parseInt(id));
      if (member) {
        setForm(member);
      } else {
        alert("Anggota tidak ditemukan");
        navigate("/team");
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Simulasi update data
      console.log("Data diperbarui:", form);
    } else {
      // Simulasi penambahan data baru
      const newMember = {
        ...form,
        id: TeamData.length + 1, // Buat ID baru
      };
      console.log("Data baru ditambahkan:", newMember);
    }
    navigate("/team");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {isEdit ? "✏️ Edit Anggota Tim" : "➕ Tambah Anggota Tim"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#6c4432] p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628]"
            required
          />
          <input
            type="text"
            name="jabatan"
            placeholder="Jabatan"
            value={form.jabatan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628]"
            required
          />
          <input
            type="url"
            name="foto"
            placeholder="URL Foto"
            value={form.foto}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628]"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition"
          >
            <Save size={18} /> {isEdit ? "Simpan Perubahan" : "Tambah Anggota"}
          </button>
        </form>
      </div>
    </div>
  );
}
