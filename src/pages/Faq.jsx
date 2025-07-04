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
    loadFaq();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const loadFaq = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await FaqAPI.fetchFaq();
      setFaqList(data);
    } catch (err) {
      setError("Gagal memuat data FAQ");
      console.error("Error loading FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError("");
      await FaqAPI.deleteFaq(id);
      setSuccess("FAQ berhasil dihapus!");
      loadFaq();
    } catch (err) {
      setError("Gagal menghapus FAQ");
      console.error("Error deleting FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaq = faqList.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins ">
      <div className="w-full max-w-6xl p-3 space-y-6 relative">
        <h1 className="text-3xl font-bold text-center drop-shadow-md mb-6">
          Daftar FAQ
        </h1>
        {success && (
          <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <AlertBox type="success">{success}</AlertBox>
          </div>
        )}
        {error && <AlertBox type="error">{error}</AlertBox>}

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
          className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />

        <div className="bg-[var(--color-border)] rounded-2xl shadow-lg overflow-hidden border border-white/10 p-4">
          <h3 className="text-xl font-semibold text-white mb-4">
            Daftar FAQ ({filteredFaq.length})
          </h3>

          {loading ? (
            <div className="p-8 text-center text-white text-lg font-medium">
              <LoadingSpinner text="Memuat FAQ..." />
            </div>
          ) : filteredFaq.length === 0 && !error ? (
            <div className="p-8 text-center text-white text-lg font-medium">
              <EmptyState text="Belum ada FAQ. Tambah FAQ pertama Anda!" />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaq.map((faq, index) => (
                <div
                  key={faq.id}
                  className="collapse collapse-plus bg-[#523628] border border-white/10 rounded-xl"
                >
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-white flex justify-between items-center">
                    <span>
                      {index + 1}. {faq.pertanyaan}
                    </span>
                    <div
                      className="flex gap-3 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={`/faq/${faq.id}`}
                        className="text-yellow-300 hover:text-yellow-400 transition-colors"
                        title="Edit FAQ"
                      >
                        <Pencil size={20} />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(faq.id);
                        }}
                        title="Hapus FAQ"
                      >
                        <Trash2 className="text-red-400 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                  <div className="collapse-content text-sm text-white">
                    {faq.jawaban}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
