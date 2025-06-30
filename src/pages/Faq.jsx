import { useState, useEffect } from "react";
import { FaqAPI } from "../services/FaqAPI";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Faq() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [faqList, setFaqList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await FaqAPI.fetchFaqs();
      setFaqList(data);
    } catch (err) {
      setError("Gagal memuat data FAQ");
      console.error("Error loading FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

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
      loadFaqs();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
      console.error("Error deleting FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaq = faqList.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins p-6 pb-16">
      <h1 className="text-3xl font-bold text-center drop-shadow-md mb-6">
        Daftar FAQ
      </h1>
      <div className="w-full max-w-5xl space-y-6 ">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {success}
          </div>
        )}
        <Link
          to="/faq/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md"
        >
          <PlusCircle size={18} /> Tambah FAQ Baru
        </Link>
        <input
          type="text"
          placeholder="🔍 Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />
        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white">
              Daftar FAQ ({filteredFaq.length})
            </h3>
          </div>
          {loading ? (
            <div className="p-8 text-center text-white text-lg font-medium">
              <LoadingSpinner text="Memuat FAQ..." />
            </div>
          ) : filteredFaq.length === 0 && !error ? (
            <div className="p-8 text-center text-white text-lg font-medium">
              <EmptyState text="Belum ada FAQ. Tambah FAQ pertama Anda!" />
            </div>
          ) : filteredFaq.length === 0 && error ? (
            <div className="p-8 text-center text-red-500 text-lg font-medium">
              Terjadi Kesalahan. Coba lagi nanti.
            </div>
          ) : (
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
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white line-clamp-3">
                          {faq.pertanyaan}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-white line-clamp-3">
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
          )}
        </div>
      </div>
    </div>
  );
}
