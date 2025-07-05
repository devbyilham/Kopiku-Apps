import { useEffect, useState } from "react";
import { UserAPI } from "../services/UserAPI";
import AlertBox from "../components/AlertBox";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [form, setForm] = useState({ id: "", nama: "", email: "", role: "" });
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchUser = async () => {
    try {
      const data = await UserAPI.fetchUser();
      setUserList(data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setToast({ type: "error", message: "Gagal memuat data user." });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setToast(null);

    if (!form.nama || !form.email || !form.role) {
      setToast({
        type: "error",
        message: "Nama, email, dan role tidak boleh kosong!",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setToast({ type: "error", message: "Format email tidak valid!" });
      return;
    }

    try {
      if (editMode) {
        await UserAPI.updateUser(form.id, {
          nama: form.nama,
          email: form.email,
          role: form.role,
        });
        setToast({ type: "success", message: "✅ User berhasil diperbarui!" });
      } else {
        await UserAPI.createUser({
          nama: form.nama,
          email: form.email,
          role: form.role,
        });
        setToast({ type: "success", message: "✅ User berhasil ditambahkan!" });
      }

      fetchUser();
      setForm({ id: "", nama: "", email: "", role: "" });
      setEditMode(false);
    } catch (err) {
      console.error("Error saving user:", err);
      setToast({
        type: "error",
        message: "❌ Gagal menyimpan user. Silakan coba lagi.",
      });
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditMode(true);
    setToast(null);
  };

  const handleDelete = async (id) => {
    setToast(null);

    try {
      await UserAPI.deleteUser(id);
      setToast({ type: "success", message: "🗑️ User berhasil dihapus!" });
      fetchUser();
    } catch (err) {
      console.error("Error deleting user:", err);
      setToast({
        type: "error",
        message: "❌ Gagal menghapus user. Silakan coba lagi.",
      });
    }
  };

  const filtered = userList.filter((u) =>
    (u.nama || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#523628] text-white font-poppins">
      <div className="w-full max-w-6xl p-3">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          Manajemen User & Role
        </h1>

        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <AlertBox type={toast.type}>{toast.message}</AlertBox>
          </div>
        )}

        <div className="mb-10 rounded-lg shadow-md overflow-hidden">
          <div
            className={`px-6 py-4 ${
              editMode ? "bg-yellow-700" : "bg-[#8b5e45]"
            }`}
          >
            <h2 className="text-xl font-bold text-white">
              {editMode ? "✏️ Edit User" : "➕ Tambah User"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-border)] p-6 text-white">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="Nama"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-2 rounded text-black bg-white"
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="Kasir">Kasir</option>
                <option value="Barista">Barista</option>
                <option value="Waiter">Waiter</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 bg-[var(--color-border)] px-6 py-4 border-t border-white/20">
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 ${
                editMode
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } rounded text-white font-semibold`}
            >
              {editMode ? "Simpan" : "Tambah"}
            </button>
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setForm({ id: "", nama: "", email: "", role: "" });
                  setToast(null);
                }}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white font-semibold"
              >
                Batal
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari nama user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl text-white bg-[var(--color-border)] border border-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a06c47] shadow-md"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 gap-2 bg-[#8b5e45] py-3 rounded-t-lg font-semibold text-sm border-b border-white/30 text-center">
              <div>No</div>
              <div>Nama</div>
              <div>Email</div>
              <div>Role</div>
              <div>Aksi</div>
            </div>
            {filtered.length === 0 ? (
              <div className="p-4 bg-[#6c4432] text-center text-white rounded-b-lg">
                Tidak ada user ditemukan.
              </div>
            ) : (
              filtered.map((user, index) => (
                <div
                  key={user.id}
                  className="grid grid-cols-5 items-center py-4 gap-2 bg-[var(--color-border)] transition text-sm text-center border-b border-white/10 last:border-b-0"
                >
                  <div>{index + 1}</div>
                  <div>{user.nama}</div>
                  <div>{user.email}</div>
                  <div>{user.role}</div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-2 text-xs bg-yellow-500 hover:bg-yellow-600 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-2 text-xs bg-red-500 hover:bg-red-600 rounded text-white"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
