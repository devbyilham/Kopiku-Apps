import { useState } from "react";

export default function Profil() {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    lokasi: "",
    email: "",
    telp: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Perusahaan:", form);
  };

  return (
    <div className="min-h-screen bg-[#523628] text-white font-poppins flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 text-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#523628]">
          Profil Perusahaan - Kopiku ☕
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Nama Perusahaan</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="Kopiku"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="Jl. Aroma Kopi No. 123"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="Jakarta, Indonesia"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="kopiku@email.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">No. Telepon</label>
            <input
              type="tel"
              name="telp"
              value={form.telp}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="0812xxxxxxx"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="p-3 rounded bg-gray-100"
              placeholder="www.kopiku.id"
            />
          </div>
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-[#a06c47] text-white rounded hover:bg-[#8b5e45] transition"
            >
              Simpan Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
