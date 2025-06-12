import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { FaqAPI } from "../services/FaqAPI"; // Import FaqAPI Anda

export default function FaqForm() {
  const { id } = useParams(); // 'id' bisa berupa string angka (untuk edit) atau 'add' (untuk tambah)
  const navigate = useNavigate();
  // isEdit akan true jika 'id' ada DAN BUKAN string 'add'
  const isEdit = id && id !== "add"; // Lebih spesifik untuk membedakan mode edit dan tambah

  const [form, setForm] = useState({ pertanyaan: "", jawaban: "" });
  const [loading, setLoading] = useState(false); // State untuk menunjukkan proses loading API
  const [error, setError] = useState(null); // State untuk menangani error dari API

  useEffect(() => {
    // Logika ini hanya berjalan jika kita dalam mode edit
    if (isEdit) {
      const parsedId = parseInt(id); // Coba parse ID

      // Jika ID tidak valid (misalnya setelah parsing jadi NaN), langsung tangani
      if (isNaN(parsedId)) {
        setError("ID FAQ tidak valid. Mengarahkan kembali ke daftar FAQ.");
        console.error("Invalid FAQ ID detected:", id); // Konsol log untuk debugging
        navigate("/faq"); // Langsung arahkan kembali ke daftar FAQ
        return; // Hentikan eksekusi lebih lanjut di useEffect ini
      }

      const fetchFaqForEdit = async () => {
        setLoading(true); // Mulai loading
        setError(null); // Hapus error sebelumnya
        try {
          const existingFaq = await FaqAPI.getFaqById(parsedId); // Panggil API dengan ID yang sudah diparsing
          if (existingFaq) {
            setForm({
              pertanyaan: existingFaq.pertanyaan,
              jawaban: existingFaq.jawaban,
            });
          } else {
            setError("FAQ tidak ditemukan.");
            navigate("/faq"); // Redirect jika FAQ tidak ditemukan
          }
        } catch (err) {
          setError("Gagal memuat data FAQ: " + err.message);
          console.error("Error fetching FAQ for edit:", err);
        } finally {
          setLoading(false); // Selesai loading
        }
      };

      fetchFaqForEdit();
    } else {
      // Jika bukan mode edit (yaitu, mode "tambah" atau id tidak ada sama sekali),
      // pastikan form dalam keadaan bersih dan tidak ada loading/error awal.
      setForm({ pertanyaan: "", jawaban: "" });
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
        // Lakukan validasi parsedId lagi saat submit untuk edit
        if (isNaN(parsedId)) {
          setError("ID FAQ tidak valid untuk diperbarui. Mohon coba lagi.");
          setLoading(false);
          return;
        }
        await FaqAPI.updateFaq(parsedId, form);
        alert("FAQ berhasil diperbarui!");
      } else {
        // Mode tambah
        await FaqAPI.createFaq(form);
        alert("FAQ berhasil ditambahkan!");
      }
      navigate("/faq"); // Navigasi kembali ke halaman daftar FAQ setelah sukses
    } catch (err) {
      setError("Gagal menyimpan FAQ: " + err.message);
      console.error("Error saving FAQ:", err);
      alert("Gagal menyimpan FAQ."); // Berikan umpan balik kepada pengguna
    } finally {
      setLoading(false); // Nonaktifkan loading setelah selesai
    }
  };

  // Tampilkan pesan loading atau error (hanya jika dalam mode edit)
  // Untuk mode 'tambah', form akan langsung terlihat.
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
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center drop-shadow-md">
          {isEdit ? "✏️ Edit FAQ" : "➕ Tambah FAQ"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#6c4432] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
          <input
            type="text"
            name="pertanyaan"
            placeholder="📝 Pertanyaan"
            value={form.pertanyaan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
          />
          <textarea
            name="jawaban"
            placeholder="💬 Jawaban"
            value={form.jawaban}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
          ></textarea>
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
              : "Simpan FAQ"}
          </button>
        </form>
      </div>
    </div>
  );
}
