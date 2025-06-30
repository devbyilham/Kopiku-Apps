import { useEffect, useState } from "react";
import KopiData from "../data/Kopi.json";

export default function ListMenu() {
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

  const allRating = [...new Set(kopiList.map((k) => k.rating))].sort((a, b) => a - b);
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
    setFormAdd({ nama: "", deskripsi: "", rating: "", harga: "", asal: "", kafein: "", takaran: "", gambar: "" });
  };

  const handleDelete = (id) => {
    setKopiList(kopiList.filter((kopi) => kopi.id !== id));
  };

  const handleEdit = (id) => {
    const edited = prompt("Edit nama kopi:");
    if (edited !== null) {
      const newData = kopiList.map(kopi => kopi.id === id ? { ...kopi, nama: edited } : kopi);
      setKopiList(newData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">Daftar Menu Kopi</h1>

        {/* Form Tambah */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">➕ Tambah Menu Kopi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(formAdd).map(([key, value]) => (
              <input
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={e => setFormAdd({ ...formAdd, [key]: e.target.value })}
                className="p-2 rounded text-black"
              />
            ))}
          </div>
          <button onClick={handleAdd} className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white">Tambah</button>
        </div>

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="searchTerm"
            placeholder="🔍 Cari kopi..."
            className="p-2 border border-gray-300 rounded text-white"
            onChange={handleChange}
            value={dataForm.searchTerm}
          />

          <select name="selectedRating" className="p-2 rounded bg-white text-black" onChange={handleChange} value={dataForm.selectedRating}>
            <option value="">⭐ Rating</option>
            {allRating.map((rating, index) => (
              <option key={index} value={rating}>⭐ {rating}</option>
            ))}
          </select>

          <select name="selectedAsal" className="p-2 rounded bg-white text-black" onChange={handleChange} value={dataForm.selectedAsal}>
            <option value="">🌍 Asal</option>
            {allAsal.map((asal, index) => (
              <option key={index} value={asal}>{asal}</option>
            ))}
          </select>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-10 gap-2 bg-[#754e3d] px-4 py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div><div>Gambar</div><div>Nama</div><div>Deskripsi</div><div>Rating</div><div>Harga</div><div>Asal</div><div>Kafein</div><div>Takaran</div><div>Aksi</div>
            </div>
            {filteredKopi.map((item, index) => (
              <div key={item.id} className="grid grid-cols-10 items-center px-4 py-3 gap-2 bg-[#6c4432] hover:bg-[#8b5e3c]/80 transition text-sm text-center">
                <div className="font-bold">{index + 1}</div>
                <div className="flex justify-center"><img src={item.gambar} alt={item.nama} className="w-20 h-20 object-cover rounded" /></div>
                <div className="font-semibold">{item.nama}</div>
                <div className="text-xs text-gray-200 text-justify">{item.deskripsi}</div>
                <div className="text-yellow-300">⭐ {item.rating}</div>
                <div className="font-bold">Rp {item.harga}</div>
                <div className="text-xs">{item.detail.asal}</div>
                <div className="text-xs">{item.detail.kafein}</div>
                <div className="text-xs">{item.detail.takaran}</div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleEdit(item.id)} className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 rounded text-white">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}