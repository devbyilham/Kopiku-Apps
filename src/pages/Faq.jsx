import { useState } from "react";
import FaqData from "../data/Faq.json";
import { Pencil, Trash2, PlusCircle, Save } from "lucide-react";

export default function FaqManager() {
  const [faqList, setFaqList] = useState(FaqData);
  const [form, setForm] = useState({ pertanyaan: "", jawaban: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setFaqList(
        faqList.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        )
      );
      setEditId(null);
    } else {
      const newFaq = {
        id: faqList.length + 1,
        ...form,
      };
      setFaqList([...faqList, newFaq]);
    }

    setForm({ pertanyaan: "", jawaban: "" });
  };

  const handleEdit = (faq) => {
    setForm({ pertanyaan: faq.pertanyaan, jawaban: faq.jawaban });
    setEditId(faq.id);
  };

  const handleDelete = (id) => {
    setFaqList(faqList.filter((faq) => faq.id !== id));
  };

  const filteredFaq = faqList.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-md">
          📚 Manajemen FAQ
        </h1>

        {/* Form FAQ */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#6c4432] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
          <h2 className="text-xl font-semibold text-center">
            {editId ? "✏️ Edit Pertanyaan" : "➕ Tambah Pertanyaan"}
          </h2>
          <input
            type="text"
            name="pertanyaan"
            placeholder="📝 Pertanyaan"
            value={form.pertanyaan}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
          <textarea
            name="jawaban"
            placeholder="💬 Jawaban"
            value={form.jawaban}
            onChange={handleChange}
            className="w-full p-2 rounded text-white min-h-[100px]"
            required
          ></textarea>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#8b5e3c] hover:bg-[#a06c47] w-full py-2 rounded font-semibold text-white transition"
          >
            {editId ? <Save size={18} /> : <PlusCircle size={18} />}
            {editId ? "Simpan Perubahan" : "Tambah FAQ"}
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        {/* List FAQ */}
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
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-yellow-300 hover:text-yellow-400 transition"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
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
