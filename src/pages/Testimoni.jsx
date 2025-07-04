import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
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

        {/* List Testimoni */}
        <ul className="list bg-[#6c4432] rounded-box shadow-md divide-y divide-white/10">
          {filtered.map((item, index) => (
            <li
              key={item.id}
              className="list-row p-4 flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-[#8b5e45] rounded-full flex items-center justify-center font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.nama}</div>
                <div className="text-sm mt-1 opacity-80">{item.review}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => handleEdit(item)} title="Edit Testimoni">
                  <Pencil className="text-yellow-300 hover:text-yellow-400 transition-colors" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  title="Hapus Testimoni"
                >
                  <Trash2 className="text-red-400 hover:text-red-500 transition-colors" />
                </button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && !loading && (
            <li className="text-center py-6 text-white opacity-70">
              Tidak ada testimoni ditemukan.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
