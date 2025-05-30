export default function Projek() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#523628] text-white font-[Poppins] flex-wrap gap-4">
      <div className="bg-[#754e3d] p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
        <Login />
      </div>
      <div className="bg-[#754e3d] p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
        <Profil />
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="flex items-center gap-12 flex-wrap text-center">
      <div className="flex flex-col gap-4">
        <Judul />
        <Email />
        <Password />
        <Submit />
      </div>
      <Gambar />
    </div>
  );
}

function Judul() {
  return <h2 className="text-3xl mb-2 -mt-2">Login</h2>;
}

function Email() {
  return (
    <div className="flex flex-col">
      <label className="text-base mb-1">Masukkan Email</label>
      <input
        type="email"
        placeholder="Email"
        className="p-3 text-base rounded-lg bg-white text-black focus:outline-none focus:shadow-md transition-all"
      />
    </div>
  );
}

function Password() {
  return (
    <div className="flex flex-col">
      <label className="text-base mb-1">Masukkan Password</label>
      <input
        type="password"
        placeholder="Password"
        className="p-3 text-base rounded-lg bg-white text-black focus:outline-none focus:shadow-md transition-all"
      />
    </div>
  );
}

function Submit() {
  return (
    <button className="bg-[#f08c50] text-white py-3 px-4 text-lg rounded-lg mt-6 hover:bg-[#d9773a] hover:scale-105 transition-all">
      Login
    </button>
  );
}

function Gambar() {
  return (
    <img
      className="w-[250px] rounded-lg transition-transform hover:scale-105"
      src="https://i.pinimg.com/736x/9a/21/13/9a211344ac13f46a318d28a5d3698bb9.jpg"
      alt="Gambar"
    />
  );
}

function Profil() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col gap-4">
        <Lokasi />
        <Jam />
        <Temukan />
        <Kontak />
      </div>
    </div>
  );
}

function Lokasi() {
  return <h3 className="text-xl">☕ Lokasi : Jl. Air Dingin, Pekanbaru</h3>;
}

function Jam() {
  return (
    <h3 className="text-xl">🕰️ Jam Buka : Senin - Minggu, 07.00 - 23.00 WIB</h3>
  );
}

function Temukan() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-xl">📍 Temukan Kami :</h3>
      <div className="flex justify-center gap-4">
        <a
          href="https://instagram.com/aromacoffee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 no-underline text-white px-2 py-1 rounded-lg hover:opacity-70 hover:scale-105 transition-all"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt="Instagram"
            className="w-[30px] h-[30px]"
          />
          Instagram
        </a>
        <a
          href="https://facebook.com/aromacoffee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 no-underline text-white px-2 py-1 rounded-lg hover:opacity-70 hover:scale-105 transition-all"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt="Facebook"
            className="w-[30px] h-[30px]"
          />
          Facebook
        </a>
      </div>
    </div>
  );
}

function Kontak() {
  return (
    <h3 className="text-xl">📞 Hubungi : +62 812-3456-7890 (WA & Telp)</h3>
  );
}
