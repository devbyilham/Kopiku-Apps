import { useParams, useNavigate } from "react-router-dom";
import ContactMessages from "../data/Contact.json";

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cari pesan berdasarkan id (parseInt karena id number)
  const message = ContactMessages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
        <h2 className="text-2xl font-bold mb-4">Pesan tidak ditemukan</h2>
        <button
          onClick={() => navigate("/contact")}
          className="px-4 py-2 bg-[#8b5e3c] rounded hover:bg-[#a06c47]"
        >
          Kembali ke daftar pesan
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
      <div className="w-full max-w-md bg-[#6c4432] rounded p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Detail Pesan Kontak
        </h1>
        <p>
          <strong>Nama:</strong> {message.nama}
        </p>
        <p>
          <strong>Email:</strong> {message.email}
        </p>
        <p>
          <strong>Subjek:</strong> {message.subjek}
        </p>
        <p>
          <strong>Pesan:</strong> {message.pesan}
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="mt-6 px-4 py-2 bg-[#8b5e3c] rounded hover:bg-[#a06c47]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
