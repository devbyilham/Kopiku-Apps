import { useState } from "react";
import ArtikelData from "../data/Artikel.json";
import { v4 as uuidv4 } from "uuid";

export default function Artikel() {
  const [artikelList, setArtikelList] = useState(ArtikelData);
  const [form, setForm] = useState({ id: "", judul: "", isi: "" });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.judul || !form.isi) return;

    if (editMode) {
      setArtikelList(
        artikelList.map((a) => (a.id === form.id ? { ...form } : a))
      );
    } else {
      const newArtikel = {
        ...form,
        id: uuidv4(),
        tanggal: new Date().toISOString().slice(0, 10),
      };
      setArtikelList([...artikelList, newArtikel]);
    }

    setForm({ id: "", judul: "", isi: "" });
    setEditMode(false);
  };

  const handleEdit = (artikel) => {
    setForm(artikel);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setArtikelList(artikelList.filter((a) => a.id !== id));
  };

  const filtered = artikelList.filter((a) =>
    (a.judul || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins ">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Artikel
        </h1>

        {/* Form Tambah/Edit */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editMode ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editMode ? "✏️ Edit Artikel" : "➕ Tambah Artikel"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-border)] p-6 text-white">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Judul</label>
              <input
                type="text"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white focus:outline-none"
                placeholder="Judul Artikel"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium">Isi</label>
              <textarea
                name="isi"
                rows="4"
                value={form.isi}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white focus:outline-none"
                placeholder="Isi Artikel"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 bg-[var(--color-border)] px-6 py-4 border-t border-white/20">
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 ${
                editMode
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } rounded text-white font-semibold`}
            >
              {editMode ? "Simpan" : "Tambah"}
            </button>
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setForm({ id: "", judul: "", isi: "" });
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
            placeholder="🔍 Cari judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          />
        </div>

        {/* Tabel Artikel */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5 gap-2 bg-[#8b5e45] px-4 py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Judul</div>
              <div>Isi</div>
              <div>Tanggal</div>
              <div>Aksi</div>
            </div>
            {filtered.map((artikel, index) => (
              <div
                key={artikel.id}
                className="grid grid-cols-5 items-center px-4 py-3 gap-2 bg-[var(--color-border)] transition text-sm text-center"
              >
                <div className="font-bold">{index + 1}</div>
                <div className="font-semibold">{artikel.judul}</div>
                <div className="text-xs text-justify">{artikel.isi}</div>
                <div className="text-xs">{artikel.tanggal}</div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleEdit(artikel)}
                    className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(artikel.id)}
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 rounded text-white"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
