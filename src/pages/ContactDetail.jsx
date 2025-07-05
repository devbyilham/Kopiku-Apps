import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { KontakAPI } from "../services/KontakAPI";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      setLoading(true);
      setError(null);

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("ID Pesan tidak valid.");
        setLoading(false);
        console.error("Invalid Message ID:", id);
        navigate("/contact");
        return;
      }

      try {
        const data = await KontakAPI.getKontakById(parsedId);
        if (data) {
          setMessage(data);
        } else {
          setError("Pesan tidak ditemukan.");
          navigate("/contact");
        }
      } catch (err) {
        setError("Gagal memuat detail pesan: " + err.message);
        console.error("Error fetching message details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessageDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <LoadingSpinner text="Memuat detail pesan..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <AlertBox type="error">{error}</AlertBox>
        <button
          onClick={() => navigate("/contact")}
          className="mt-4 px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar pesan
        </button>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Pesan tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar pesan
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins p-3">
      <div className="w-full max-w-md bg-[var(--color-border)] rounded-2xl p-8 shadow-xl border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-md">
          Detail Pesan Kontak
        </h1>
        <div className="space-y-4 text-white/90 text-lg">
          <p>
            <strong className="text-white">Nama:</strong> {message.nama}
          </p>
          <p>
            <strong className="text-white">Email:</strong> {message.email}
          </p>
          <p>
            <strong className="text-white">Pesan:</strong>{" "}
            <span className="block mt-1 text-white/80 leading-relaxed">
              {message.pesan || "Tidak ada pesan."}
            </span>
          </p>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="mt-8 w-full px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#6c4432]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
