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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Data Perusahaan:", form);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000); // simulasi delay
  };

  return (
    <div className="min-h-screen bg-[#523628] text-white font-poppins flex flex-col items-center">
      <div className="w-full max-w-4xl p-3">
        <div className="mb-6 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-[#8b5e45]">
            <h1 className="text-2xl font-bold text-white text-center">
              Profil Perusahaan - Kopiku ☕
            </h1>
          </div>

          {success && (
            <div className="bg-green-500 text-white text-center py-2 font-semibold">
              ✅ Profil berhasil disimpan!
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-border)] p-6 text-white"
          >
            {/* input fields tetap sama */}
            {["nama", "alamat", "lokasi", "email", "telp", "website"].map(
              (field, i) => (
                <div key={i} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium capitalize">
                    {field}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "telp"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="p-2 rounded text-black bg-white"
                    placeholder={
                      field === "nama"
                        ? "Kopiku"
                        : field === "alamat"
                        ? "Jl. Aroma Kopi No. 123"
                        : field === "lokasi"
                        ? "Pekanbaru, Indonesia"
                        : field === "email"
                        ? "kopiku@email.com"
                        : field === "telp"
                        ? "0812xxxxxxx"
                        : "www.kopiku.id"
                    }
                  />
                </div>
              )
            )}

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded font-semibold text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Profil"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
