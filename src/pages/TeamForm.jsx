import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { TimAPI } from "../services/TimAPI";
import AlertBox from "../components/AlertBox"; // Import komponen reusable
import LoadingSpinner from "../components/LoadingSpinner"; // Import komponen reusable

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "add";

  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        setError(
          "ID anggota tim tidak valid. Mengarahkan kembali ke daftar tim."
        );
        console.error("Invalid Team ID detected:", id);
        navigate("/team");
        return;
      }

      const fetchTeamMemberForEdit = async () => {
        setLoading(true);
        setError(null);
        try {
          const existingMember = await TimAPI.getTimById(parsedId);
          if (existingMember) {
            setForm({
              nama: existingMember.nama,
              jabatan: existingMember.jabatan,
              foto: existingMember.foto,
            });
          } else {
            setError("Anggota tim tidak ditemukan.");
            navigate("/team");
          }
        } catch (err) {
          setError("Gagal memuat data anggota tim: " + err.message);
          console.error("Error fetching team member for edit:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchTeamMemberForEdit();
    } else {
      setForm({ nama: "", jabatan: "", foto: "" });
      setLoading(false);
      setError(null);
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
          setError(
            "ID anggota tim tidak valid untuk diperbarui. Mohon coba lagi."
          );
          setLoading(false);
          return;
        }
        await TimAPI.updateTim(parsedId, form);
        alert("Anggota tim berhasil diperbarui!");
      } else {
        await TimAPI.createTim(form);
        alert("Anggota tim berhasil ditambahkan!");
      }
      navigate("/team");
    } catch (err) {
      setError("Gagal menyimpan anggota tim: " + err.message);
      console.error("Error saving team member:", err);
      alert("Gagal menyimpan anggota tim.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#523628] text-white">
        <LoadingSpinner text="Memuat form..." />
      </div>
    );
  }

  if (error && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#523628] text-white">
        <AlertBox type="error">{error}</AlertBox>
        <button
          onClick={() => navigate("/team")}
          className="mt-4 px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar tim
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-xl space-y-6 p-3">
        <h1 className="text-3xl font-bold text-center drop-shadow-md">
          {isEdit ? "✏️ Edit Anggota Tim" : "➕ Tambah Anggota Tim"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-border)] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="jabatan"
            placeholder="Jabatan"
            value={form.jabatan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
            disabled={loading}
          />
          <input
            type="url"
            name="foto"
            placeholder="URL Foto"
            value={form.foto}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            disabled={loading}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Save size={18} />
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Simpan Perubahan"
              : "Tambah Anggota"}
          </button>
        </form>
      </div>
    </div>
  );
}
