import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { FaqAPI } from "../services/FaqAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function FaqForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "add";

  const [form, setForm] = useState({ pertanyaan: "", jawaban: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("ID FAQ tidak valid. Mengarahkan kembali ke daftar FAQ.");
        navigate("/faq");
        return;
      }

      const fetchFaqForEdit = async () => {
        setLoading(true);
        setError(null);
        try {
          const existingFaq = await FaqAPI.getFaqById(parsedId);
          if (existingFaq) {
            setForm({
              pertanyaan: existingFaq.pertanyaan,
              jawaban: existingFaq.jawaban,
            });
          } else {
            setError("FAQ tidak ditemukan.");
            navigate("/faq");
          }
        } catch (err) {
          setError("Gagal memuat data FAQ: " + err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFaqForEdit();
    } else {
      setForm({ pertanyaan: "", jawaban: "" });
      setLoading(false);
      setError(null);
    }
  }, [id, isEdit, navigate]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
          setError("ID FAQ tidak valid untuk diperbarui. Mohon coba lagi.");
          setLoading(false);
          return;
        }
        await FaqAPI.updateFaq(parsedId, form);
        setToast({ type: "success", message: "FAQ berhasil diperbarui!" });
      } else {
        await FaqAPI.createFaq(form);
        setToast({ type: "success", message: "FAQ berhasil ditambahkan!" });
      }
      setTimeout(() => navigate("/faq"), 1000);
    } catch (err) {
      setToast({ type: "error", message: "Gagal menyimpan FAQ." });
      setError("Gagal menyimpan FAQ: " + err.message);
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
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#523628] text-white px-4">
        <AlertBox type="error">{error}</AlertBox>
        <button
          onClick={() => navigate("/faq")}
          className="mt-4 px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar FAQ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#523628] text-white font-poppins p-3">

      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in">
          <AlertBox type={toast.type}>{toast.message}</AlertBox>
        </div>
      )}

      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center drop-shadow-md">
          {isEdit ? "✏️ Edit FAQ" : "➕ Tambah FAQ"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-border)] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
          <input
            type="text"
            name="pertanyaan"
            placeholder="📝 Pertanyaan"
            value={form.pertanyaan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
            disabled={loading}
          />
          <textarea
            name="jawaban"
            placeholder="💬 Jawaban"
            value={form.jawaban}
            onChange={handleChange}
            className="w-full p-2 rounded text-white bg-[#523628] border border-white/10 placeholder-gray-300 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#a06c47]"
            required
            disabled={loading}
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
