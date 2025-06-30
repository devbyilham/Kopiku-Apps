import { useEffect, useState } from "react";
import ArtikelData from "../data/Artikel.json";
import { v4 as uuidv4 } from "uuid";

export default function Artikel() {
  const [artikelList, setArtikelList] = useState([]);
  const [form, setForm] = useState({ id: "", judul: "", isi: "", penulis: "" });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Ambil dari localStorage, kalau kosong, pakai data dari JSON
    const stored = localStorage.getItem("artikelList");
    if (stored) {
      setArtikelList(JSON.parse(stored));
    } else {
      setArtikelList(ArtikelData);
      localStorage.setItem("artikelList", JSON.stringify(ArtikelData)); // Simpan agar bisa ditambah/hapus
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("artikelList", JSON.stringify(artikelList));
  }, [artikelList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.judul || !form.isi || !form.penulis) return;

    if (editMode) {
      setArtikelList(
        artikelList.map((a) => (a.id === form.id ? { ...form } : a))
      );
    } else {
      setArtikelList([...artikelList, { ...form, id: uuidv4() }]);
    }

    setForm({ id: "", judul: "", isi: "", penulis: "" });
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
    a.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold text-center drop-shadow-md mb-6">
          Manajemen Artikel / News
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari judul artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
        />

        {/* Form */}
        <div className="bg-[#6c4432] p-4 rounded-xl space-y-4 border border-white/10">
          <h2 className="text-2xl font-bold">
            {editMode ? "✏️ Edit" : "➕ Tambah"} Artikel
          </h2>
          <input
            type="text"
            name="judul"
            placeholder="Judul"
            value={form.judul}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white text-black"
          />
          <textarea
            name="isi"
            placeholder="Isi artikel"
            value={form.isi}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded bg-white text-black"
          />
          <input
            type="text"
            name="penulis"
            placeholder="Penulis"
            value={form.penulis}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white text-black"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-[#a06c47] hover:bg-[#8b5e3c] text-white"
          >
            {editMode ? "Simpan Perubahan" : "Tambah Artikel"}
          </button>
        </div>

        {/* Daftar Artikel */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-center text-white/80">
              Tidak ada artikel ditemukan.
            </p>
          )}
          {filtered.map((a, i) => (
            <div
              key={a.id}
              className="bg-[#6c4432] p-4 rounded-xl border border-white/10 shadow-md"
            >
              <h3 className="text-xl font-bold mb-1">
                {i + 1}. {a.judul}
              </h3>
              <p className="text-sm text-white/80 mb-2 whitespace-pre-wrap text-justify">
                {a.isi}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
