import { useState } from "react";
import BookingData from "../data/Booking.json";
import { Link } from "react-router-dom";

export default function Booking() {
  const [search, setSearch] = useState("");

  // Filter booking berdasarkan namaUser atau keterangan (case insensitive)
  const filteredBooking = BookingData.filter((booking) => {
    const term = search.toLowerCase();
    return (
      booking.namaUser.toLowerCase().includes(term) ||
      booking.keterangan.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#523628] text-white font-poppins p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-10 drop-shadow-md">
          Manajemen Booking
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari nama user atau keterangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 mb-6 rounded text-white w-full"
        />

        {/* List Booking */}
        <div className="bg-[#6c4432] rounded-md shadow-md overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-white/30 text-center">
            <thead className="bg-[#754e3d] font-semibold text-sm">
              <tr>
                <th className="border border-white/20 px-4 py-3">No</th>
                <th className="border border-white/20 px-4 py-3">Nama User</th>
                <th className="border border-white/20 px-4 py-3">Tanggal</th>
                <th className="border border-white/20 px-4 py-3">Jam</th>
                <th className="border border-white/20 px-4 py-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooking.length > 0 ? (
                filteredBooking.map((booking, index) => (
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
                        {booking.namaUser}
                      </Link>
                    </td>
                    <td className="border border-white/20 px-4 py-3">
                      {booking.tanggal}
                    </td>
                    <td className="border border-white/20 px-4 py-3">
                      {booking.jam}
                    </td>
                    <td className="border border-white/20 px-4 py-3 text-justify">
                      {booking.keterangan}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-gray-300 italic"
                  >
                    Tidak ada booking yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
