import { useState } from "react";
import FaqData from "../data/Faq.json";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Faq() {
  const [faqList, setFaqList] = useState(FaqData);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    const confirm = window.confirm("Yakin ingin menghapus FAQ ini?");
    if (confirm) {
      setFaqList(faqList.filter((faq) => faq.id !== id));
    }
  };

  const filteredFaq = faqList.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-md">
          📚 Daftar FAQ
        </h1>

        {/* Tombol Tambah FAQ */}
        <Link
          to="/faq/add"
          className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition"
        >
          <PlusCircle size={18} /> Tambah FAQ
        </Link>

        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="🔍 Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-white bg-[#6c4432] border border-white/10"
        />

        {/* Daftar FAQ */}
        <div className="space-y-4">
          {filteredFaq.map((faq, index) => (
            <div
              key={faq.id}
              className="p-4 rounded-lg bg-[#6c4432] hover:shadow-lg transition duration-200 border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold mb-1">
                    {index + 1}. {faq.pertanyaan}
                  </h3>
                  <p className="text-sm text-gray-200">{faq.jawaban}</p>
                </div>
                <div className="flex gap-2 mt-1 ml-4">
                  {/* Link Edit FAQ */}
                  <Link
                    to={`/faq/${faq.id}`}
                    className="text-yellow-300 hover:text-yellow-400 transition"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </Link>

                  {/* Tombol Hapus */}
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-400 hover:text-red-500 transition"
                    title="Hapus"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredFaq.length === 0 && (
            <p className="text-center text-gray-300">Tidak ada data FAQ.</p>
          )}
        </div>
      </div>
    </div>
  );
}
