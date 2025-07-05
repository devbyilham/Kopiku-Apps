import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { TimAPI } from "../services/TimAPI";
import AlertBox from "../components/AlertBox"; // Import AlertBox
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "add";

  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For persistent errors (e.g., initial data load failure)
  const [toast, setToast] = useState(null); // For transient success/error messages after form submission

  useEffect(() => {
    if (isEdit) {
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        setError(
          "ID anggota tim tidak valid. Mengarahkan kembali ke daftar tim."
        );
        console.error("Invalid Team ID detected:", id);
        // Navigate after a short delay to allow error message to be seen
        setTimeout(() => navigate("/team"), 2000);
        return;
      }

      const fetchTeamMemberForEdit = async () => {
        setLoading(true);
        setError(null); // Clear any previous persistent error
        setToast(null); // Clear any previous toast
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
            // Navigate after a short delay to allow error message to be seen
            setTimeout(() => navigate("/team"), 2000);
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
      setError(null); // Clear any persistent errors when switching to add mode
      setToast(null); // Clear any toast when switching to add mode
    }
  }, [id, isEdit, navigate]);

  // Effect to hide the toast notification after 3 seconds
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
    setError(null); // Clear persistent errors
    setToast(null); // Clear previous toasts

    try {
      if (isEdit) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
          // This internal check for invalid ID should use toast as it's a submission error
          setToast({
            type: "error",
            message:
              "ID anggota tim tidak valid untuk diperbarui. Mohon coba lagi.",
          });
          setLoading(false);
          return;
        }
        await TimAPI.updateTim(parsedId, form);
        setToast({
          type: "success",
          message: "Anggota tim berhasil diperbarui!",
        });
      } else {
        await TimAPI.createTim(form);
        setToast({
          type: "success",
          message: "Anggota tim berhasil ditambahkan!",
        });
      }
      // Navigate after a short delay to allow toast to be seen
      setTimeout(() => navigate("/team"), 1000);
    } catch (err) {
      // Use toast for submission errors, replacing native alert
      setToast({ type: "error", message: "Gagal menyimpan anggota tim." });
      console.error("Error saving team member:", err);
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

  // This block handles persistent errors (e.g., initial fetch failed or invalid ID on load)
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#523628] text-white px-4">
        <AlertBox type="error">{error}</AlertBox>
        {/* The button is still necessary to allow navigation back after a persistent error */}
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

        {/* Toast Alert: Render AlertBox when 'toast' state is not null */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <AlertBox type={toast.type}>{toast.message}</AlertBox>
          </div>
        )}

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
