import { useEffect, useState } from "react";
import { GaleriAPI } from "../services/GaleriAPI";

export default function Galeri() {
  const [galeriList, setGaleriList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    tipe: "Gambar",
    judul: "",
    link: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    const data = await GaleriAPI.fetchGaleri();
    setGaleriList(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.judul || !form.link || !form.tipe) return;

    if (editMode) {
      await GaleriAPI.updateGaleri(form.id, {
        judul: form.judul,
        link: form.link,
        tipe: form.tipe,
      });
    } else {
      await GaleriAPI.createGaleri({
        judul: form.judul,
        link: form.link,
        tipe: form.tipe,
      });
    }

    fetchGaleri();
    setForm({ id: "", tipe: "Gambar", judul: "", link: "" });
    setEditMode(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await GaleriAPI.deleteGaleri(id);
    fetchGaleri();
  };

  const filtered = galeriList.filter((item) =>
    (item.judul || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Galeri Media
        </h1>

        {/* Form Tambah/Edit */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editMode ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editMode ? "✏️ Edit Media" : "➕ Tambah Media"}
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
                placeholder="Judul Media"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Tipe</label>
              <select
                name="tipe"
                value={form.tipe}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
              >
                <option value="Gambar">Gambar</option>
                <option value="Video">Video</option>
              </select>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium">Link</label>
              <input
                type="text"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="URL Media"
              />
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
                  setForm({ id: "", tipe: "Gambar", judul: "", link: "" });
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
            placeholder="🔍 Cari judul media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          />
        </div>

        {/* Tabel Galeri */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 gap-2 bg-[#8b5e45] py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Judul</div>
              <div>Tipe</div>
              <div>Preview</div>
              <div>Aksi</div>
            </div>
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center py-4 gap-2 bg-[var(--color-border)] transition text-sm text-center"
              >
                <div>{index + 1}</div>
                <div>{item.judul}</div>
                <div>{item.tipe}</div>
                <div className="overflow-hidden max-h-[100px]">
                  {item.tipe === "Gambar" ? (
                    <img
                      src={item.link}
                      alt={item.judul}
                      className="mx-auto h-24 object-contain rounded"
                    />
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline"
                    >
                      Lihat Video
                    </a>
                  )}
                </div>
                <div className="flex flex-row justify-center gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
