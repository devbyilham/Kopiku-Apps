import { useState, useEffect } from "react"; // Tambahkan useEffect
// import ContactMessages from "../data/Contact.json"; // Hapus atau komentari ini
import { Link } from "react-router-dom";
import { KontakAPI } from "../services/KontakAPI"; // <-- Import KontakAPI Anda

export default function Contact() {
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(""); // State untuk error

  const [contactList, setContactList] = useState([]); // Daftar kontak dari API
  const [search, setSearch] = useState(""); // Untuk fitur pencarian

  // Memuat data kontak saat komponen pertama kali di-render
  useEffect(() => {
    loadContacts();
  }, []);

  // Fungsi untuk memuat data kontak dari API
  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(""); // Hapus error sebelumnya
      const data = await KontakAPI.fetchKontak(); // Panggil fetchKontak sesuai KontakAPI
      setContactList(data);
      // console.log("Data diterima dari API:", data); // Debug opsional: lihat data dari API
    } catch (err) {
      setError("Gagal memuat pesan kontak.");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter berdasarkan nama, email, subjek, atau pesan (case insensitive)
  const filteredMessages = contactList.filter((msg) => {
    const term = search.toLowerCase();
    return (
      msg.nama.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.subjek.toLowerCase().includes(term) ||
      msg.pesan.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      {" "}
      {/* Konsisten padding */}
      <div className="w-full max-w-5xl space-y-6">
        {" "}
        {/* Konsisten spacing */}
        <h1 className="text-4xl font-bold text-center drop-shadow-md mb-8">
          {" "}
          {/* mb-8 di sini, space-y-6 di parent */}
          Manajemen Kontak Masuk
        </h1>
        {/* Pesan Error (jika ada) */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg text-center shadow-md">
            {error}
          </div>
        )}
        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Cari nama, email, subjek, atau pesan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />
        {/* List Pesan / Table */}
        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          {" "}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-[#523628] font-semibold text-sm">
                {" "}
                {/* Warna header konsisten */}
                <tr>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    No
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Nama
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Email
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Subjek
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Pesan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Indikator Loading */}
                {loading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-white text-lg font-medium"
                    >
                      Memuat pesan kontak...
                    </td>
                  </tr>
                )}

                {/* State Kosong / Tanpa Data */}
                {!loading && filteredMessages.length === 0 && !error && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-white/70 text-lg font-medium"
                    >
                      Tidak ada pesan yang ditemukan.
                    </td>
                  </tr>
                )}

                {/* Pesan Error Saat Data Kosong */}
                {!loading && filteredMessages.length === 0 && error && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-red-500 text-lg font-medium"
                    >
                      {error} Coba lagi nanti.
                    </td>
                  </tr>
                )}

                {/* Tampilan Data Pesan */}
                {!loading && filteredMessages.length > 0
                  ? filteredMessages.map((msg, index) => (
                      <tr
                        key={msg.id}
                        className="hover:bg-[#7a5342] transition-colors duration-150 text-white/90 text-sm"
                      >
                        <td className="border-b border-white/10 px-4 py-3 font-semibold text-left">
                          {index + 1}.
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          <Link
                            to={`/contact/${msg.id}`}
                            className="text-[#f4eae6] hover:underline font-medium"
                          >
                            {msg.nama}
                          </Link>
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          {msg.email}
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          {msg.subjek}
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-justify line-clamp-2">
                          {" "}
                          {/* line-clamp untuk pesan panjang */}
                          {msg.pesan}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
