import { useState, useEffect } from "react";
import { FaqAPI } from "../services/FaqAPI"; // Import FaqAPI Anda
import { Pencil, Trash2, PlusCircle } from "lucide-react"; // Ikon yang digunakan
import { Link } from "react-router-dom"; // Import Link untuk navigasi

export default function Faq() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [faqList, setFaqList] = useState([]); // Daftar FAQ dari API
  const [search, setSearch] = useState(""); // Untuk fitur pencarian

  // Memuat data FAQ saat komponen pertama kali di-render
  useEffect(() => {
    loadFaqs();
  }, []);

  // Memanggil fetchFaqs beserta error/loading handling
  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await FaqAPI.fetchFaqs(); // Panggil fungsi untuk mengambil semua FAQ dari API
      setFaqList(data);
    } catch (err) {
      setError("Gagal memuat data FAQ");
      console.error("Error loading FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await FaqAPI.deleteFaq(id);
      setSuccess("FAQ berhasil dihapus!");

      setTimeout(() => setSuccess(""), 3000);
      loadFaqs(); // Muat ulang daftar FAQ setelah penghapusan
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
      console.error("Error deleting FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logika pencarian FAQ
  const filteredFaq = faqList.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        {/* Kontainer utama dengan lebar maksimum dan spasi vertikal */}
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-md">
          📚 Daftar FAQ
        </h1>
        {/* Pesan Error dan Sukses sederhana */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {" "}
            {/* Warna merah lebih gelap untuk kontras */}
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {" "}
            {/* Warna hijau lebih gelap untuk kontras */}
            {success}
          </div>
        )}
        {/* Tombol Tambah FAQ */}
        <Link
          to="/faq/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md"
        >
          <PlusCircle size={18} /> Tambah FAQ Baru
        </Link>
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="🔍 Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md" // Placeholder tetap abu-abu muda
          disabled={loading}
        />
        {/* FAQ List/Table */}
        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          {/* Tambahkan border */}
          <div className="px-6 py-4 border-b border-white/10">
            {/* Tambahkan border bottom */}
            <h3 className="text-xl font-semibold text-white">
              Daftar FAQ ({filteredFaq.length})
            </h3>
          </div>
          {/* Indikator Loading */}
          {loading && (
            <div className="p-8 text-center text-white text-lg font-medium">
              Memuat FAQ...
            </div> // Teks loading lebih tebal
          )}
          {/* State Kosong / Tanpa Data */}
          {!loading && filteredFaq.length === 0 && !error && (
            <div className="p-8 text-center text-white text-lg font-medium">
              {" "}
              {/* Mengubah text-white/70 menjadi text-white */}
              Belum ada FAQ. Tambah FAQ pertama Anda!
            </div>
          )}
          {/* Pesan Error Saat Data Kosong */}
          {!loading && filteredFaq.length === 0 && error && (
            <div className="p-8 text-center text-red-500 text-lg font-medium">
              {" "}
              {/* Mengubah text-red-400 menjadi text-red-500 */}
              Terjadi Kesalahan. Coba lagi nanti.
            </div>
          )}
          {/* Tampilan Data FAQ */}
          {!loading && filteredFaq.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-[#523628]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Pertanyaan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Jawaban
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#6c4432] divide-y divide-white/10">
                  {filteredFaq.map((faq, index) => (
                    <tr
                      key={faq.id}
                      className="hover:bg-[#7a5342] transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                        {" "}
                        {/* Mengubah text-white/90 menjadi text-white */}
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white line-clamp-3">
                          {" "}
                          {/* Warna pertanyaan tetap sama, cukup kontras */}
                          {faq.pertanyaan}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-white line-clamp-3">
                          {" "}
                          {/* Mengubah text-white/80 menjadi text-white */}
                          {faq.jawaban}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-3 items-center">
                        <Link
                          to={`/faq/${faq.id}`}
                          className="text-yellow-300 hover:text-yellow-400 transition-colors"
                          title="Edit FAQ"
                        >
                          <Pencil size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          disabled={loading}
                          title="Hapus FAQ"
                        >
                          <Trash2
                            size={20}
                            className="text-red-400 hover:text-red-500 transition-colors"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
