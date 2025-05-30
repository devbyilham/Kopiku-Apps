import KopiData from "./Kopi.json";
import { useState } from "react";

export default function ListMenu() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedRating: "",
    selectedAsal: "",
  });

  // Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // untuk search diubah nya ke huruf kecil semua
  const _searchTerm = dataForm.searchTerm.toLowerCase();

  // untuk filter
  const filteredKopi = KopiData.filter((kopi) => {
    const matchesSearch = kopi.nama.toLowerCase().includes(_searchTerm);

    const matchesRating = dataForm.selectedRating
      ? // ? kopi.rating.toString().includes(dataForm.selectedRating)  tidak akurat karna angka filternya spesifik
        kopi.rating.toString() === dataForm.selectedRating
      : true;

    const matchesAsal = dataForm.selectedAsal
      ? kopi.detail.asal.includes(dataForm.selectedAsal)
      : true;

    return matchesSearch && matchesRating && matchesAsal;
  });

  // ratingnya berurutan dari terbesar ke terkecil
  const allRating = [...new Set(KopiData.flatMap((kopi) => kopi.rating))].sort(
    (a, b) => a - b
  );

  // asalnya berurutan dari a ke z
  const allAsal = [
    ...new Set(KopiData.flatMap((kopi) => kopi.detail.asal)),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-6">
        <h1 className="text-3xl font-bold text-center mb-11 drop-shadow-md">
          Daftar Menu Kopi
        </h1>

        {/* form pencarian dan filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="searchTerm"
            placeholder="🔍 Masukkan kopi yang dicari..."
            className="p-2 border border-gray-300 rounded text-white"
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

        {/* Header Tabel */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* header */}
            <div className="grid grid-cols-9 gap-2 bg-[#754e3d] px-4 py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Gambar</div>
              <div>Nama</div>
              <div>Deskripsi</div>
              <div>Rating</div>
              <div>Harga</div>
              <div>Asal</div>
              <div>Kafein</div>
              <div>Takaran</div>
            </div>

            {/* Data Kopi */}
            {filteredKopi.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-9 items-center px-4 py-3 gap-2 bg-[#6c4432] hover:bg-[#8b5e3c]/80 transition text-sm text-center"
              >
                <div className="font-bold">{index + 1}</div>
                <div className="flex justify-center">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-21 h-21 object-cover rounded"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
