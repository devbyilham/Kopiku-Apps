import { useEffect, useState } from "react";
import KopiData from "../data/Kopi.json";

export default function Menu() {
  const [kopiList, setKopiList] = useState([]);
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedRating: "",
    selectedAsal: "",
  });
  const [formAdd, setFormAdd] = useState({
    nama: "",
    deskripsi: "",
    rating: "",
    harga: "",
    asal: "",
    kafein: "",
    takaran: "",
    gambar: "",
  });

  const [editId, setEditId] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nama: "",
    deskripsi: "",
    rating: "",
    harga: "",
    asal: "",
    kafein: "",
    takaran: "",
    gambar: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("kopiList");
    if (stored) setKopiList(JSON.parse(stored));
    else setKopiList(KopiData);
  }, []);

  useEffect(() => {
    localStorage.setItem("kopiList", JSON.stringify(kopiList));
  }, [kopiList]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredKopi = kopiList.filter((kopi) => {
    const matchesSearch = kopi.nama.toLowerCase().includes(_searchTerm);
    const matchesRating = dataForm.selectedRating
      ? kopi.rating.toString() === dataForm.selectedRating
      : true;
    const matchesAsal = dataForm.selectedAsal
      ? kopi.detail.asal.includes(dataForm.selectedAsal)
      : true;
    return matchesSearch && matchesRating && matchesAsal;
  });

  const allRating = [...new Set(kopiList.map((k) => k.rating))].sort(
    (a, b) => a - b
  );
  const allAsal = [...new Set(kopiList.map((k) => k.detail.asal))].sort();

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      nama: formAdd.nama,
      deskripsi: formAdd.deskripsi,
      rating: parseFloat(formAdd.rating),
      harga: formAdd.harga,
      gambar: formAdd.gambar,
      detail: {
        asal: formAdd.asal,
        kafein: formAdd.kafein,
        takaran: formAdd.takaran,
      },
    };
    setKopiList([...kopiList, newItem]);
    setFormAdd({
      nama: "",
      deskripsi: "",
      rating: "",
      harga: "",
      asal: "",
      kafein: "",
      takaran: "",
      gambar: "",
    });
  };

  const handleDelete = (id) => {
    setKopiList(kopiList.filter((kopi) => kopi.id !== id));
  };

  const handleEdit = (id) => {
    const kopiToEdit = kopiList.find((kopi) => kopi.id === id);
    setEditId(id);
    setFormEdit({
      nama: kopiToEdit.nama,
      deskripsi: kopiToEdit.deskripsi,
      rating: kopiToEdit.rating,
      harga: kopiToEdit.harga,
      asal: kopiToEdit.detail.asal,
      kafein: kopiToEdit.detail.kafein,
      takaran: kopiToEdit.detail.takaran,
      gambar: kopiToEdit.gambar,
    });
  };

  const handleUpdate = () => {
    const updatedList = kopiList.map((kopi) =>
      kopi.id === editId
        ? {
            ...kopi,
            nama: formEdit.nama,
            deskripsi: formEdit.deskripsi,
            rating: parseFloat(formEdit.rating),
            harga: formEdit.harga,
            gambar: formEdit.gambar,
            detail: {
              asal: formEdit.asal,
              kafein: formEdit.kafein,
              takaran: formEdit.takaran,
            },
          }
        : kopi
    );
    setKopiList(updatedList);
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Daftar Menu Kopi
        </h1>

        {/* Form Tambah */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#8b5e45] px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              ➕ Tambah Menu Kopi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-border)] p-6 text-white">
            {[
              { label: "Nama Kopi", name: "nama" },
              { label: "Deskripsi", name: "deskripsi" },
              { label: "Rating", name: "rating", type: "number" },
              { label: "Harga", name: "harga" },
              { label: "Asal", name: "asal" },
              { label: "Kafein", name: "kafein" },
              { label: "Takaran", name: "takaran" },
              { label: "URL Gambar", name: "gambar" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formAdd[field.name]}
                  onChange={(e) =>
                    setFormAdd({ ...formAdd, [field.name]: e.target.value })
                  }
                  className="p-2 rounded text-black bg-white focus:outline-none"
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end bg-[var(--color-border)] px-6 py-4 border-t border-white/20">
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Form Edit */}
        {editId && (
          <div className="mb-10 rounded-lg shadow-md overflow-hidden">
            <div className="bg-yellow-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                ✏️ Edit Menu Kopi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-border)] p-6 text-white">
              {[
                { label: "Nama Kopi", name: "nama" },
                { label: "Deskripsi", name: "deskripsi" },
                { label: "Rating", name: "rating", type: "number" },
                { label: "Harga", name: "harga" },
                { label: "Asal", name: "asal" },
                { label: "Kafein", name: "kafein" },
                { label: "Takaran", name: "takaran" },
                { label: "URL Gambar", name: "gambar" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formEdit[field.name]}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, [field.name]: e.target.value })
                    }
                    className="p-2 rounded text-black bg-white focus:outline-none"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 bg-[var(--color-border)] px-6 py-4 border-t border-white/20">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-semibold"
              >
                Simpan
              </button>
              <button
                onClick={cancelEdit}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="searchTerm"
            placeholder="🔍 Cari kopi..."
            className="p-2 border bg-[var(--color-border)] rounded text-white"
            onChange={handleChange}
            value={dataForm.searchTerm}
          />
          <select
            name="selectedRating"
            className="p-2 rounded bg-white text-black"
            onChange={handleChange}
            value={dataForm.selectedRating}
          >
            <option value="">⭐ Rating</option>
            {allRating.map((rating, index) => (
              <option key={index} value={rating}>
                ⭐ {rating}
              </option>
            ))}
          </select>
          <select
            name="selectedAsal"
            className="p-2 rounded bg-white text-black"
            onChange={handleChange}
            value={dataForm.selectedAsal}
          >
            <option value="">🌍 Asal</option>
            {allAsal.map((asal, index) => (
              <option key={index} value={asal}>
                {asal}
              </option>
            ))}
          </select>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-10 gap-2 bg-[#8b5e45] px-4 py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Gambar</div>
              <div>Nama</div>
              <div>Deskripsi</div>
              <div>Rating</div>
              <div>Harga</div>
              <div>Asal</div>
              <div>Kafein</div>
              <div>Takaran</div>
              <div>Aksi</div>
            </div>
            {filteredKopi.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-10 items-center px-4 py-3 gap-2 bg-[var(--color-border)] transition text-sm text-center"
              >
                <div className="font-bold">{index + 1}</div>
                <div className="flex justify-center">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
                <div className="font-semibold">{item.nama}</div>
                <div className="text-xs text-gray-200 text-justify">
                  {item.deskripsi}
                </div>
                <div className="text-yellow-300">⭐ {item.rating}</div>
                <div className="font-bold">Rp {item.harga}</div>
                <div className="text-xs">{item.detail.asal}</div>
                <div className="text-xs">{item.detail.kafein}</div>
                <div className="text-xs">{item.detail.takaran}</div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
