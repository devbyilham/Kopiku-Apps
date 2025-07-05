import { useEffect, useState } from "react";
import Gaji from "../components/Gaji"; // Assuming this is a component for salary input
import { LokerAPI } from "../services/LokerAPI";
import AlertBox from "../components/AlertBox"; // Import AlertBox

export default function ManajemenLowongan() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    posisi: "",
    gaji: "",
  });
  const [errors, setErrors] = useState({}); // For form validation errors
  const [lowongans, setLowongans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null); // For transient success/error messages (API operations)

  useEffect(() => {
    loadData();
  }, []);

  // Effect to hide the toast notification after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const loadData = async () => {
    try {
      const data = await LokerAPI.fetchLoker();
      setLowongans(data || []);
    } catch (err) {
      console.error("Failed to load job vacancies:", err);
      setToast({ type: "error", message: "Gagal memuat data lowongan." });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama tidak boleh kosong";
    if (!form.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!form.posisi.trim()) newErrors.posisi = "Posisi tidak boleh kosong";
    // Check if gaji is empty or not a positive number
    if (!form.gaji || parseFloat(form.gaji) <= 0) {
      newErrors.gaji = "Gaji harus lebih dari 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm({ nama: "", email: "", posisi: "", gaji: "" });
    setEditingId(null);
    setErrors({}); // Clear validation errors
    setToast(null); // Clear any toast messages when resetting form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null); // Clear previous toasts before new submission

    if (!validate()) {
      setToast({
        type: "error",
        message: "Mohon lengkapi semua data yang diperlukan.",
      }); // Notify user about validation errors
      return;
    }

    try {
      if (editingId !== null) {
        await LokerAPI.updateLoker(editingId, form);
        setToast({ type: "success", message: "Lowongan berhasil diperbarui!" });
      } else {
        await LokerAPI.createLoker(form);
        setToast({
          type: "success",
          message: "Lowongan berhasil ditambahkan!",
        });
      }
      await loadData(); // Reload data after successful operation
      resetForm();
    } catch (err) {
      console.error("Error saving job vacancy:", err);
      setToast({
        type: "error",
        message: "Gagal menyimpan lowongan. Silakan coba lagi.",
      });
    }
  };

  const handleEdit = (lowongan) => {
    setEditingId(lowongan.id);
    setForm({
      nama: lowongan.nama,
      email: lowongan.email,
      posisi: lowongan.posisi,
      gaji: lowongan.gaji,
    });
    setErrors({}); // Clear validation errors when editing
    setToast(null); // Clear any toast messages when starting edit
  };

  const handleDelete = async (id) => {
    // Removed window.confirm as requested ("tanpa alert")
    try {
      await LokerAPI.deleteLoker(id);
      setToast({ type: "success", message: "Lowongan berhasil dihapus!" });
      await loadData();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Error deleting job vacancy:", err);
      setToast({
        type: "error",
        message: "Gagal menghapus lowongan. Silakan coba lagi.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-3">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Manajemen Lowongan
        </h1>

        {/* Toast Alert: Render AlertBox when 'toast' state is not null */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <AlertBox type={toast.type}>{toast.message}</AlertBox>
          </div>
        )}

        {/* Form Tambah/Edit */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editingId !== null ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editingId !== null ? "✏️ Edit Lowongan" : "➕ Tambah Lowongan"}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-border)] p-6 text-white">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="p-2 rounded text-black bg-white"
                  placeholder="Nama Pelamar"
                />
                {errors.nama && (
                  <p className="text-red-400 text-sm mt-1">{errors.nama}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="p-2 rounded text-black bg-white"
                  placeholder="Email Pelamar"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Posisi</label>
                <input
                  type="text"
                  name="posisi"
                  value={form.posisi}
                  onChange={handleChange}
                  className="p-2 rounded text-black bg-white"
                  placeholder="Nama Posisi"
                />
                {errors.posisi && (
                  <p className="text-red-400 text-sm mt-1">{errors.posisi}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Gaji</label>
                <Gaji // Assuming Gaji component handles its own input and passes value via onChange
                  label=""
                  type="number"
                  name="gaji"
                  placeholder="Masukkan Gaji"
                  value={form.gaji}
                  onChange={(e) =>
                    setForm({ ...form, gaji: Number(e.target.value) })
                  }
                />
                {errors.gaji && (
                  <p className="text-red-400 text-sm mt-1">{errors.gaji}</p>
                )}
              </div>
              {form.gaji && (
                <div className="right md:col-span-2 flex justify-end">
                  <div
                    className={`mt-2 p-2 border-l-4 ${
                      form.gaji <= 10000000 // Changed from 2000000 to 10000000 for "Gaji Pas"
                        ? "bg-blue-100 border-blue-500 text-blue-800"
                        : "bg-red-100 border-red-500 text-red-800"
                    }`}
                  >
                    <p className="font-semibold text-black">
                      {" "}
                      {/* Changed text-blue-800/text-red-800 to text-black for visibility with bg-blue-100/bg-red-100 */}
                      {form.gaji <= 10000000
                        ? "Gaji Pas"
                        : "Gaji Kemahalan, turunkan dikit😅"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 bg-[var(--color-border)] px-6 py-4 border-t border-white/20">
              <button
                type="submit"
                className={`px-6 py-2 ${
                  editingId !== null
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } rounded text-white font-semibold`}
              >
                {editingId !== null ? "Simpan" : "Tambah"}
              </button>
              {editingId !== null && (
                <button
                  onClick={resetForm}
                  type="button"
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Lowongan */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-6 gap-2 bg-[#8b5e45] py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Nama</div>
              <div>Email</div>
              <div>Posisi</div>
              <div>Gaji</div>
              <div>Aksi</div>
            </div>
            {lowongans.map((lowongan, i) => (
              <div
                key={lowongan.id}
                className="grid grid-cols-6 items-center py-4 gap-2 bg-[var(--color-border)] transition text-sm text-center border-b border-white/10 last:border-b-0"
              >
                <div>{i + 1}</div>
                <div>{lowongan.nama}</div>
                <div>{lowongan.email}</div>
                <div>{lowongan.posisi}</div>
                <div>
                  Rp {Number(lowongan.gaji).toLocaleString("id-ID")}
                </div>{" "}
                {/* Format to Indonesian Rupiah */}
                <div className="flex flex-row justify-center gap-3">
                  <button
                    className="px-3 py-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                    onClick={() => handleEdit(lowongan)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-2 text-xs bg-red-500 hover:bg-red-600 rounded text-white"
                    onClick={() => handleDelete(lowongan.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {lowongans.length === 0 && (
              <div className="p-4 bg-[#6c4432] text-center text-white rounded-b-lg">
                Belum ada lowongan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
