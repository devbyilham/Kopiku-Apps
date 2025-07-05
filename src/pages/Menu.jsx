import React, { useEffect, useState } from "react";
import { ProdukAPI } from "../services/ProdukAPI";
import AlertBox from "../components/AlertBox"; // Import the AlertBox component

export default function Menu() {
  const [produkList, setProdukList] = useState([]);
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedRating: "",
    selectedAsal: "",
  });
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    rating: "",
    harga: "",
    asal: "",
    kafein: "",
    takaran: "",
    gambar: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState(""); // State for managing alert messages
  const [alertType, setAlertType] = useState("success"); // State for alert type (success or error)

  const getProduk = async () => {
    try {
      const data = await ProdukAPI.fetchProduk();
      setProdukList(data);
    } catch (err) {
      console.error(err);
      showAlert("⚠️ Gagal memuat daftar produk.", "error"); // Show error alert
    }
  };

  useEffect(() => {
    getProduk();
  }, []);

  // Function to show alert messages
  const showAlert = (message, type = "success") => {
    setAlert(message);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("success"); // Reset type to default
    }, 3000); // Alert disappears after 3 seconds
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rating" || name === "harga" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await ProdukAPI.updateProduk(form.id, {
          nama: form.nama,
          deskripsi: form.deskripsi,
          rating: form.rating,
          harga: form.harga,
          asal: form.asal,
          kafein: form.kafein,
          takaran: form.takaran,
          gambar: form.gambar,
        });
        showAlert("✅ Menu kopi berhasil diperbarui!", "success");
      } else {
        await ProdukAPI.createProduk(form);
        showAlert("✅ Menu kopi berhasil ditambahkan!", "success");
      }
      getProduk();
      setForm({
        nama: "",
        deskripsi: "",
        rating: "",
        harga: "",
        asal: "",
        kafein: "",
        takaran: "",
        gambar: "",
      });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      showAlert("❌ Gagal menyimpan menu kopi. Silakan coba lagi.", "error");
    }
  };

  const handleEdit = async (id) => {
    try {
      const item = await ProdukAPI.getProdukById(id);
      setForm(item);
      setEditMode(true);
    } catch (err) {
      console.error(err);
      showAlert("⚠️ Gagal memuat data menu untuk diedit.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProdukAPI.deleteProduk(id);
      getProduk();
      showAlert("🗑️ Menu kopi berhasil dihapus!", "success");
    } catch (err) {
      console.error(err);
      showAlert("❌ Gagal menghapus menu kopi. Silakan coba lagi.", "error");
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setForm({
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

        {/* AlertBox */}
        {alert && <AlertBox type={alertType}>{alert}</AlertBox>}

        {/* Form Tambah/Edit */}
        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editMode ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editMode ? "✏️ Edit Menu Kopi" : "➕ Tambah Menu Kopi"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-border)] p-6 text-white">
            {Object.keys(form).map((field) =>
              // EXCLUDE the 'id' field from being rendered as an input
              field !== "id" ? (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "rating" || field === "harga"
                        ? "number"
                        : "text"
                    }
                    name={field}
                    value={form[field]}
                    onChange={handleFormChange}
                    className="p-2 rounded text-black bg-white focus:outline-none"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                </div>
              ) : null
            )}
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
                onClick={cancelEdit}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
              >
                Batal
              </button>
            )}
          </div>
        </div>

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

        {/* Daftar Produk */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduk.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--color-border)] rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
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
