import React, { useEffect, useState } from "react";
import { ProdukAPI } from "../services/ProdukAPI";

export default function Menu() {
  const [produkList, setProdukList] = useState([]);
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
  const [formEdit, setFormEdit] = useState({ ...formAdd });
  const [editId, setEditId] = useState(null);

  const getProduk = async () => {
    try {
      const data = await ProdukAPI.fetchProduk();
      setProdukList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduk();
  }, []);

  const handleAdd = async () => {
    try {
      await ProdukAPI.createProduk(formAdd);
      getProduk();
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const item = await ProdukAPI.getProdukById(id);
      setFormEdit(item);
      setEditId(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await ProdukAPI.updateProduk(editId, formEdit);
      getProduk();
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProdukAPI.deleteProduk(id);
      getProduk();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const filteredProduk = produkList.filter((item) => {
    return (
      item.nama.toLowerCase().includes(dataForm.searchTerm.toLowerCase()) &&
      (dataForm.selectedRating
        ? item.rating === parseInt(dataForm.selectedRating)
        : true) &&
      (dataForm.selectedAsal ? item.asal === dataForm.selectedAsal : true)
    );
  });

  const allRating = [...new Set(produkList.map((item) => item.rating))];
  const allAsal = [...new Set(produkList.map((item) => item.asal))];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-3">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#6c4432] p-6 text-white">
            {Object.keys(formAdd).map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "rating" ? "number" : "text"}
                  name={field}
                  value={formAdd[field]}
                  onChange={(e) =>
                    setFormAdd({ ...formAdd, [field]: e.target.value })
                  }
                  className="p-2 rounded text-black bg-white focus:outline-none"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end bg-[#6c4432] px-6 py-4 border-t border-white/20">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#6c4432] p-6 text-white">
              {Object.keys(formEdit).map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "rating" ? "number" : "text"}
                    name={field}
                    value={formEdit[field]}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, [field]: e.target.value })
                    }
                    className="p-2 rounded text-black bg-white focus:outline-none"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 bg-[#6c4432] px-6 py-4 border-t border-white/20">
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
            className="p-2 border bg-[#6c4432] rounded text-white"
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

        {/* Daftar Produk */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduk.map((item) => (
            <div
              key={item.id}
              className="bg-[#6c4432] rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{item.nama}</h3>
                <p className="text-sm italic text-white/80">{item.deskripsi}</p>
                <div className="text-sm space-y-1">
                  <p>
                    Harga:{" "}
                    <span className="font-bold text-[#f08c50]">
                      Rp {item.harga}
                    </span>
                  </p>
                  <p>Rating: ⭐ {item.rating}/5</p>
                  <p>Asal: {item.asal}</p>
                  <p>Kafein: {item.kafein}</p>
                  <p>Takaran: {item.takaran}</p>
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-1 rounded text-sm font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 py-1 rounded text-sm font-medium"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
