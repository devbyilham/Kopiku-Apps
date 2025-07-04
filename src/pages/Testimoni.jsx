import { useState, useEffect } from "react";
import { TestimoniAPI } from "../services/TestimoniAPI";

export default function Testimoni() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [form, setForm] = useState({ id: "", nama: "", review: "" });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    try {
      setLoading(true);
      const data = await TestimoniAPI.fetchTestimoni();
      setTestimoniList(data);
    } catch (err) {
      console.error("Gagal memuat testimoni", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.nama || !form.review) return;

    try {
      setLoading(true);
      if (editMode) {
        await TestimoniAPI.updateTestimoni(form.id, {
          nama: form.nama,
          review: form.review,
        });
        setMessage("✅ Testimoni berhasil diperbarui!");
      } else {
        await TestimoniAPI.createTestimoni({
          nama: form.nama,
          review: form.review,
        });
        setMessage("✅ Testimoni berhasil ditambahkan!");
      }
      fetchTestimoni();
      setForm({ id: "", nama: "", review: "" });
      setEditMode(false);
    } catch (err) {
      console.error("Gagal menyimpan testimoni", err);
      setMessage("❌ Gagal menyimpan data.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await TestimoniAPI.deleteTestimoni(id);
      setMessage("🗑️ Testimoni berhasil dihapus!");
      fetchTestimoni();
    } catch (err) {
      console.error("Gagal menghapus", err);
      setMessage("❌ Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filtered = testimoniList.filter((t) =>
    (t.nama || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Testimoni
        </h1>

        {message && (
          <div className="mb-4 text-center font-semibold text-white bg-green-500/80 py-2 rounded shadow-md">
            {message}
          </div>
        )}

        {/* Form Tambah/Edit */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editMode ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editMode ? "✏️ Edit Testimoni" : "➕ Tambah Testimoni"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#6c4432] p-6 text-white">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="Nama Pelanggan"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium">Review</label>
              <textarea
                name="review"
                rows="4"
                value={form.review}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="Review dari pelanggan..."
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 bg-[#6c4432] px-6 py-4 border-t border-white/20">
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 ${
                editMode
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } rounded text-white font-semibold`}
              disabled={loading}
            >
              {editMode ? "Simpan" : "Tambah"}
            </button>
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setForm({ id: "", nama: "", review: "" });
                }}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
              >
                Batal
              </button>
            )}
          </div>
        </div>

        {/* Filter/Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          />
        </div>

        {/* Tabel Testimoni */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-4 gap-2 bg-[#8b5e45] py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Nama</div>
              <div>Review</div>
              <div>Aksi</div>
            </div>
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center py-4 gap-2 bg-[#6c4432] transition text-sm text-center"
              >
                <div>{index + 1}</div>
                <div>{item.nama}</div>
                <div className="text-justify px-2">{item.review}</div>
                <div className="flex flex-row justify-center gap-5">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 text-xs bg-red-500 hover:bg-red-600 rounded text-white"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <div className="text-center py-6 text-white">
                Tidak ada testimoni ditemukan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
