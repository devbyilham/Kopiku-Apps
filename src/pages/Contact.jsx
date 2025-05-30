import { useState } from "react";
import ContactMessages from "../data/Contact.json";

export default function ContactInboxManager() {
  const [search, setSearch] = useState("");

  // Filter berdasarkan nama, email, subjek, atau pesan (case insensitive)
  const filteredMessages = ContactMessages.filter((msg) => {
    const term = search.toLowerCase();
    return (
      msg.nama.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.subjek.toLowerCase().includes(term) ||
      msg.pesan.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-10 drop-shadow-md">
          Manajemen Kontak Masuk
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari nama, email, subjek, atau pesan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 mb-6 rounded text-black w-full"
        />

        {/* List Pesan */}
        <div className="bg-[#6c4432] rounded-md shadow-md overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-white/30 text-center">
            <thead className="bg-[#754e3d] font-semibold text-sm">
              <tr>
                <th className="border border-white/20 px-4 py-3">No</th>
                <th className="border border-white/20 px-4 py-3">Nama</th>
                <th className="border border-white/20 px-4 py-3">Email</th>
                <th className="border border-white/20 px-4 py-3">Subjek</th>
                <th className="border border-white/20 px-4 py-3">Pesan</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, index) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-[#8b5e3c]/50 transition text-sm"
                  >
                    <td className="border border-white/20 px-4 py-3 font-semibold">
                      {index + 1}
                    </td>
                    <td className="border border-white/20 px-4 py-3">
                      {msg.nama}
                    </td>
                    <td className="border border-white/20 px-4 py-3">
                      {msg.email}
                    </td>
                    <td className="border border-white/20 px-4 py-3">
                      {msg.subjek}
                    </td>
                    <td className="border border-white/20 px-4 py-3 text-justify max-w-xs break-words">
                      {msg.pesan}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-gray-300 italic"
                  >
                    Tidak ada pesan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
