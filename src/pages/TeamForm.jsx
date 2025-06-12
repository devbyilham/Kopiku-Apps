import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { TimAPI } from "../services/TimAPI"; // <-- Import TimAPI Anda

export default function TeamForm() {
  const { id } = useParams(); // 'id' bisa berupa string angka (untuk edit) atau 'add' (untuk tambah)
  const navigate = useNavigate();
  // isEdit akan true jika 'id' ada DAN BUKAN string 'add'
  const isEdit = id && id !== "add";

  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });
  const [loading, setLoading] = useState(false); // State untuk menunjukkan proses loading API
  const [error, setError] = useState(null); // State untuk menangani error dari API

  useEffect(() => {
    // Logika ini hanya berjalan jika kita dalam mode edit
    if (isEdit) {
      const parsedId = parseInt(id); // Coba parse ID

      // Jika ID tidak valid (misalnya setelah parsing jadi NaN), langsung tangani
      if (isNaN(parsedId)) {
        setError(
          "ID anggota tim tidak valid. Mengarahkan kembali ke daftar tim."
        );
        console.error("Invalid Team ID detected:", id); // Konsol log untuk debugging
        navigate("/team"); // Langsung arahkan kembali ke daftar tim
        return; // Hentikan eksekusi lebih lanjut di useEffect ini
      }

      const fetchTeamMemberForEdit = async () => {
        setLoading(true); // Mulai loading
        setError(null); // Hapus error sebelumnya
        try {
          // Panggil TimAPI untuk mendapatkan anggota tim spesifik berdasarkan ID
          const existingMember = await TimAPI.getTimById(parsedId); // Gunakan parsedId
          if (existingMember) {
            setForm({
              nama: existingMember.nama,
              jabatan: existingMember.jabatan,
              foto: existingMember.foto,
            });
          } else {
            setError("Anggota tim tidak ditemukan.");
            navigate("/team"); // Redirect jika anggota tidak ditemukan
          }
        } catch (err) {
          setError("Gagal memuat data anggota tim: " + err.message);
          console.error("Error fetching team member for edit:", err);
        } finally {
          setLoading(false); // Selesai loading
        }
      };

      fetchTeamMemberForEdit();
    } else {
      // Jika bukan mode edit (yaitu, mode "tambah" atau id tidak ada sama sekali),
      // pastikan form dalam keadaan bersih dan tidak ada loading/error awal.
      setForm({ nama: "", jabatan: "", foto: "" });
      setLoading(false);
      setError(null);
    }
  }, [id, isEdit, navigate]); // Dependencies for useEffect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Aktifkan loading saat submit
    setError(null); // Hapus error sebelumnya

    try {
      if (isEdit) {
        const parsedId = parseInt(id);
        // Validasi ID saat submit untuk edit, lebih baik lagi kalau sudah divalidasi di useEffect
        if (isNaN(parsedId)) {
          setError(
            "ID anggota tim tidak valid untuk diperbarui. Mohon coba lagi."
          );
          setLoading(false);
          return;
        }
        // Panggil TimAPI untuk memperbarui anggota tim
        await TimAPI.updateTim(parsedId, form);
        alert("Anggota tim berhasil diperbarui!");
      } else {
        // Panggil TimAPI untuk membuat anggota tim baru
        await TimAPI.createTim(form);
        alert("Anggota tim berhasil ditambahkan!");
      }
      navigate("/team"); // Navigasi kembali ke halaman daftar tim setelah sukses
    } catch (err) {
      setError("Gagal menyimpan anggota tim: " + err.message);
      console.error("Error saving team member:", err);
      alert("Gagal menyimpan anggota tim."); // Berikan umpan balik kepada pengguna
    } finally {
      setLoading(false); // Nonaktifkan loading setelah selesai
    }
  };

  // Tampilkan pesan loading atau error (hanya jika dalam mode edit)
  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#523628] text-white">
        <p>Memuat form...</p>
      </div>
    );
  }

  if (error && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#523628] text-red-400">
        <p>{error}</p>
      </div>
    );
  }

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
            <Save size={18} />{" "}
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
