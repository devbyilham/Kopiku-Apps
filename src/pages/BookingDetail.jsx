import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookingAPI } from "../services/BookingAPI";

import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("ID Booking tidak valid.");
        setLoading(false);
        console.error("Invalid Booking ID:", id);
        navigate("/booking");
        return;
      }

      try {
        const data = await BookingAPI.getBookingById(parsedId);
        if (data) {
          setBooking(data);
        } else {
          setError("Booking tidak ditemukan.");
          navigate("/booking");
        }
      } catch (err) {
        setError("Gagal memuat detail booking: " + err.message);
        console.error("Error fetching booking details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <LoadingSpinner text="Memuat detail booking..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <AlertBox type="error">{error}</AlertBox>
        <button
          onClick={() => navigate("/booking")}
          className="mt-4 px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar booking
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Booking tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/booking")}
          className="px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#523628]"
        >
          Kembali ke daftar booking
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-md bg-[#6c4432] rounded-2xl p-8 shadow-xl border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-md">
          Detail Booking
        </h1>
        <div className="space-y-4 text-white/90 text-lg">
          <p>
            <strong className="text-white">Nama User:</strong> {booking.nama}
          </p>
          <p>
            <strong className="text-white">Jam:</strong> {booking.jam}
          </p>
          <p>
            <strong className="text-white">Keterangan:</strong>{" "}
            <span className="block mt-1 text-white/80 leading-relaxed">
              {booking.keterangan || "Tidak ada keterangan."}
            </span>
          </p>
        </div>
        <button
          onClick={() => navigate("/booking")}
          className="mt-8 w-full px-6 py-3 bg-[#8b5e3c] rounded-xl hover:bg-[#a06c47] text-white font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#a06c47] focus:ring-offset-2 focus:ring-offset-[#6c4432]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
