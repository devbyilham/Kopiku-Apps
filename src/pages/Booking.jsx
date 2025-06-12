import { useState, useEffect } from "react";
import { BookingAPI } from "../services/BookingAPI";
import { Link } from "react-router-dom";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [bookingList, setBookingList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await BookingAPI.fetchBooking();
      setBookingList(data);
      // console.log("Data diterima dari API:", data); // DEBUG: Hapus log ini setelah debugging selesai
    } catch (err) {
      setError("Gagal memuat daftar booking.");
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooking = bookingList.filter((booking) => {
    const term = search.toLowerCase();
    return (
      booking.nama.toLowerCase().includes(term) ||
      (booking.keterangan && booking.keterangan.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-10 drop-shadow-md">
          Manajemen Booking
        </h1>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center shadow-md">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="🔍 Cari nama user atau keterangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md mb-6"
          disabled={loading}
        />

        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          <table className="min-w-full table-auto border-collapse border border-white/30 text-center">
            <thead className="bg-[#754e3d] font-semibold text-sm">
              <tr>
                <th className="border border-white/20 px-4 py-3">No</th>
                <th className="border border-white/20 px-4 py-3">Nama User</th>
                {/* --- Kolom Tanggal Dihapus dari Header --- */}
                <th className="border border-white/20 px-4 py-3">Jam</th>
                <th className="border border-white/20 px-4 py-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  {/* Sesuaikan colSpan karena satu kolom telah dihapus */}
                  <td
                    colSpan={4}
                    className="p-8 text-center text-white text-lg font-medium"
                  >
                    Memuat daftar booking...
                  </td>
                </tr>
              )}

              {!loading && filteredBooking.length === 0 && !error && (
                <tr>
                  {/* Sesuaikan colSpan karena satu kolom telah dihapus */}
                  <td
                    colSpan={4}
                    className="p-8 text-center text-white/70 text-lg font-medium"
                  >
                    Tidak ada booking ditemukan.
                  </td>
                </tr>
              )}

              {!loading && filteredBooking.length === 0 && error && (
                <tr>
                  {/* Sesuaikan colSpan karena satu kolom telah dihapus */}
                  <td
                    colSpan={4}
                    className="p-8 text-center text-red-500 text-lg font-medium"
                  >
                    {error} Coba lagi nanti.
                  </td>
                </tr>
              )}

              {!loading && filteredBooking.length > 0
                ? filteredBooking.map((booking, index) => {
                    // DEBUG: Hapus log ini setelah debugging selesai
                    // console.log(`Booking ${booking.id}:`, booking);
                    // console.log(`Tanggal mentah untuk booking ${booking.id}:`, booking.tanggal);
                    // console.log(`Hasil new Date() untuk booking ${booking.id}:`, new Date(booking.tanggal));
                    // console.log(`Hasil .toLocaleDateString() untuk booking ${booking.id}:`, booking.tanggal ? new Date(booking.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Tanggal tidak valid atau kosong');

                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-[#8b5e3c]/50 transition text-sm"
                      >
                        <td className="border border-white/20 px-4 py-3 font-semibold">
                          {index + 1}
                        </td>
                        <td className="border border-white/20 px-4 py-3">
                          <Link
                            to={`/booking/${booking.id}`}
                            className="text-[#f4eae6] hover:underline"
                          >
                            {booking.nama}
                          </Link>
                        </td>
                        {/* --- Kolom Tanggal Dihapus dari Body --- */}
                        <td className="border border-white/20 px-4 py-3">
                          {booking.jam}
                        </td>
                        <td className="border border-white/20 px-4 py-3 text-justify">
                          {booking.keterangan || "-"}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
