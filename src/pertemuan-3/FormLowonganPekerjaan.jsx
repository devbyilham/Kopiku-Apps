import InputField from "./components/InputField";
import { useState } from "react";
import Gaji from "./components/Gaji";

export default function FormLowonganPekerjaan() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [gaji, setGaji] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    } else if (/\d/.test(nama)) {
      newErrors.nama = "Nama tidak boleh mengandung angka";
    }

    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!selectedPosition) {
      newErrors.selectedPosition = "Posisi harus dipilih";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (isValid) {
      alert("Form berhasil dikirim!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="bg-[#754e3d] p-2 rounded-lg shadow-md w-full max-w-2xl transition-transform transform hover:scale-103 hover:shadow-lg flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-2xl font-bold text-center mb-4 text-white tracking-wide drop-shadow-md">
            Lowongan <br /> Pekerjaan
          </h1>

          <InputField
            label="Nama"
            type="text"
            placeholder="Masukkan Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            onBlur={validate}
            error={errors.nama}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            error={errors.email}
          />

          {/* Pilihan Posisi */}
          <div className="mb-1">
            <label className="block text-white text-md font-semibold mb-1">
              Posisi
            </label>
            <select
              className="w-full p-1 border border-gray-400 rounded-md bg-white text-gray-800"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              onBlur={validate}
            >
              <option value="">Pilih Posisi</option>
              <option value="Barista">Barista</option>
              <option value="Kasir">Kasir</option>
              <option value="Waiter/Waitress">Waiter/Waitress</option>
              <option value="Chef">Chef</option>
            </select>
            {errors.selectedPosition && (
              <p className="text-red-500 text-sm mt-1">
                {errors.selectedPosition}
              </p>
            )}
          </div>

          {/* Input Gaji */}
          <Gaji
            label="Gaji"
            type="number"
            placeholder="Jumlah Gaji Yang Diinginkan"
            onChange={(e) => setGaji(Number(e.target.value))}
          />

          {/* Notifikasi Gaji */}
          {gaji <= 2000000 ? (
            <div className="mt-2 p-1 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
              <p className="font-semibold">Gaji Pas</p>
            </div>
          ) : (
            <div className="mt-2 p-1 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-semibold">Gaji Kemahalan</p>
            </div>
          )}

          {/* Tombol Submit */}
          {isValid && (
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-[#8B5E3C] text-white py-2 px-4 rounded-md hover:bg-[#A6754F] transition"
            >
              Kirim Lamaran
            </button>
          )}
        </div>

        {/* Gambar */}
        <div className="w-full md:w-1/2 p-2 flex justify-center">
          <img
            className="w-64 h-115 rounded-lg shadow-lg object-cover hover:scale-102 transition-transform duration-300"
            src="https://i.pinimg.com/736x/9a/21/13/9a211344ac13f46a318d28a5d3698bb9.jpg"
            alt="Gambar"
          />
        </div>
      </div>
    </div>
  );
}
