import { useState, useEffect } from "react";
import { ArtikelAPI } from "../services/ArtikelAPI";
import AlertBox from "../components/AlertBox";

export default function Artikel() {
  const [artikelList, setArtikelList] = useState([]);
  const [form, setForm] = useState({ id: "", judul: "", isi: "", penulis: "" });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    const data = await ArtikelAPI.fetchArtikel();
    setArtikelList(data);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.judul || !form.isi || !form.penulis) return;

    if (editMode) {
      await ArtikelAPI.updateArtikel(form.id, {
        judul: form.judul,
        isi: form.isi,
        penulis: form.penulis,
      });
      showAlert("✅ Artikel berhasil diperbarui!");
    } else {
      await ArtikelAPI.createArtikel({
        judul: form.judul,
        isi: form.isi,
        penulis: form.penulis,
      });
      showAlert("✅ Artikel berhasil ditambahkan!");
    }

    fetchArtikel();
    setForm({ id: "", judul: "", isi: "", penulis: "" });
    setEditMode(false);
  };

  const handleEdit = (artikel) => {
    setForm(artikel);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await ArtikelAPI.deleteArtikel(id);
    fetchArtikel();
    showAlert("🗑️ Artikel berhasil dihapus!");
  };

  const filtered = artikelList.filter((a) =>
    (a.judul || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins ">
      <div className="w-full max-w-6xl p-3">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Artikel
        </h1>

        {alert && <AlertBox type="success">{alert}</AlertBox>}

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
                className="p-2 rounded text-black bg-white"
                placeholder="Judul Artikel"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Penulis</label>
              <input
                type="text"
                name="penulis"
                value={form.penulis}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="Nama Penulis"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium">Isi</label>
              <textarea
                name="isi"
                rows="4"
                value={form.isi}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
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
                  setForm({ id: "", judul: "", isi: "", penulis: "" });
                }}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
              >
                Batal
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          />
        </div>

        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-[#8b5e45] font-semibold text-sm">
                <tr>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    No
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Judul
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Penulis
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Isi
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-center text-white/70"
                    >
                      Tidak ada artikel ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((artikel, index) => (
                    <tr
                      key={artikel.id}
                      className="bg-[var(--color-border)] transition-colors duration-150 text-white/90 text-sm"
                    >
                      <td className="border-b border-white/10 px-4 py-3 font-semibold text-left">
                        {index + 1}.
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-left">
                        {artikel.judul}
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-left">
                        {artikel.penulis}
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-justify line-clamp-2">
                        {artikel.isi}
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-center">
                        <div className="flex flex-row justify-center gap-2">
                          <button
                            onClick={() => handleEdit(artikel)}
                            className="px-3 py-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(artikel.id)}
                            className="px-3 py-2 text-xs bg-red-500 hover:bg-red-600 rounded text-white"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
