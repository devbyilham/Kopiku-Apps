import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FaqData from "../data/Faq.json";
import { Save } from "lucide-react";

export default function FaqForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [faqList, setFaqList] = useState(FaqData);
  const [form, setForm] = useState({ pertanyaan: "", jawaban: "" });

  useEffect(() => {
    if (isEdit) {
      const existing = faqList.find((f) => f.id === parseInt(id));
      if (existing) {
        setForm({ pertanyaan: existing.pertanyaan, jawaban: existing.jawaban });
      }
    }
  }, [id, isEdit, faqList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      const updatedList = faqList.map((faq) =>
        faq.id === parseInt(id) ? { ...faq, ...form } : faq
      );
      setFaqList(updatedList);
    } else {
      const newFaq = {
        id: faqList.length + 1,
        ...form,
      };
      setFaqList([...faqList, newFaq]);
    }

    navigate("/faq");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center drop-shadow-md">
          {isEdit ? "✏️ Edit FAQ" : "➕ Tambah FAQ"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#6c4432] rounded-lg p-6 space-y-4 shadow-md transition-all"
        >
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
            <Save size={18} />
            {isEdit ? "Simpan Perubahan" : "Simpan FAQ"}
          </button>
        </form>
      </div>
    </div>
  );
}
