import { useParams, useNavigate } from "react-router-dom";
import BookingData from "../data/Booking.json";

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cari booking berdasarkan id (parse int karena id json number)
  const booking = BookingData.find((b) => b.id === parseInt(id));

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
        <h2 className="text-2xl font-bold mb-4">Booking tidak ditemukan</h2>
        <button
          onClick={() => navigate("/booking")}
          className="px-4 py-2 bg-[#8b5e3c] rounded hover:bg-[#a06c47]"
        >
          Kembali ke daftar booking
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
      <div className="w-full max-w-md bg-[#6c4432] rounded p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Detail Booking</h1>
        <p><strong>Nama User:</strong> {booking.namaUser}</p>
        <p><strong>Tanggal:</strong> {booking.tanggal}</p>
        <p><strong>Jam:</strong> {booking.jam}</p>
        <p><strong>Keterangan:</strong> {booking.keterangan}</p>

        <button
          onClick={() => navigate("/booking")}
          className="mt-6 px-4 py-2 bg-[#8b5e3c] rounded hover:bg-[#a06c47]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
