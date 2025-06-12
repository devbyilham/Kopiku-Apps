import { useState, useEffect } from "react";
import { BookingAPI } from "../services/BookingAPI";
import { Link } from "react-router-dom";

import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold text-center drop-shadow-md mb-8">
          Manajemen Booking
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}

        <input
          type="text"
          placeholder="🔍 Cari nama user atau keterangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[#6c4432] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />

        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-[#523628] font-semibold text-sm">
                <tr>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    No
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Nama User
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Jam
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4}>
                      <LoadingSpinner text="Memuat daftar booking..." />
                    </td>
                  </tr>
                )}

                {!loading && filteredBooking.length === 0 && !error && (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState text="Tidak ada booking ditemukan." />
                    </td>
                  </tr>
                )}

                {!loading && filteredBooking.length === 0 && error && (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState text={`${error} Coba lagi nanti.`} />
                    </td>
                  </tr>
                )}

                {!loading && filteredBooking.length > 0
                  ? filteredBooking.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-[#7a5342] transition-colors duration-150"
                      >
                        <td className="border-b border-white/10 px-4 py-3 font-semibold text-white/90 text-left">
                          {index + 1}.
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          <Link
                            to={`/booking/${booking.id}`}
                            className="text-[#f4eae6] hover:underline font-medium"
                          >
                            {booking.nama}
                          </Link>
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-white/90 text-left">
                          {booking.jam}
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-justify text-white/90 line-clamp-2">
                          {booking.keterangan || "-"}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
