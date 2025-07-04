import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KontakAPI } from "../services/KontakAPI";

import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [contactList, setContactList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await KontakAPI.fetchKontak();
      setContactList(data);
    } catch (err) {
      setError("Gagal memuat pesan kontak.");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = contactList.filter((msg) => {
    const term = search.toLowerCase();
    return (
      msg.nama.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.pesan.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-3 space-y-6">
        <h1 className="text-3xl font-bold text-center drop-shadow-md mb-8">
          Manajemen Kontak Masuk
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}

        <input
          type="text"
          placeholder="🔍 Cari nama, email, atau pesan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          disabled={loading}
        />

        <div className="bg-[#6c4432] rounded-2xl shadow-lg overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-[#8b5e45] font-semibold text-sm">
                <tr>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    No
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Nama
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Email
                  </th>
                  <th className="border-b border-white/20 px-4 py-3 text-left">
                    Pesan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading && (
                  <tr>
                    <td colSpan={4}>
                      <LoadingSpinner text="Memuat pesan kontak..." />
                    </td>
                  </tr>
                )}

                {!loading && filteredMessages.length === 0 && !error && (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState text="Tidak ada pesan yang ditemukan." />
                    </td>
                  </tr>
                )}

                {!loading && filteredMessages.length === 0 && error && (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState text={`${error} Coba lagi nanti.`} />
                    </td>
                  </tr>
                )}

                {!loading && filteredMessages.length > 0
                  ? filteredMessages.map((msg, index) => (
                      <tr
                        key={msg.id}
                        className="bg-[var(--color-border)]  transition-colors duration-150 text-white/90 text-sm"
                      >
                        <td className="border-b border-white/10 px-4 py-3 font-semibold text-left">
                          {index + 1}.
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          <Link
                            to={`/contact/${msg.id}`}
                            className="text-[#f4eae6] hover:underline font-medium"
                          >
                            {msg.nama}
                          </Link>
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-left">
                          {msg.email}
                        </td>
                        <td className="border-b border-white/10 px-4 py-3 text-justify line-clamp-2">
                          {msg.pesan}
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
