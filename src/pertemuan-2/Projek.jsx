export default function Projek() {
  return (
    <div className="container">
      <div className="cardLogin">
        <Login />
      </div>
      <div className="cardProfil">
        <Profil />
      </div>
    </div>
  );
}

// Komponen Login
function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
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
  return <h2 className="login-title">Login</h2>;
}

function Email() {
  return (
    <div className="input-container">
      <label className="input-label">Masukkan Email</label>
      <input type="email" placeholder="Email" className="input-field" />
    </div>
  );
}

function Password() {
  return (
    <div className="input-container">
      <label className="input-label">Masukkan Password</label>
      <input type="password" placeholder="Password" className="input-field" />
    </div>
  );
}

function Submit() {
  return <button className="btn-submit">Login</button>;
}

function Gambar() {
  return (
    <img
      className="login-image"
      src="https://i.pinimg.com/736x/9a/21/13/9a211344ac13f46a318d28a5d3698bb9.jpg"
      alt="Gambar"
    />
  );
}

// Komponen Profil
function Profil() {
  return (
    <div className="profil-container">
      <div className="profil-form">
        <Lokasi />
        <Jam />
        <Temukan />
        <Kontak />
      </div>
    </div>
  );
}

function Lokasi() {
  return <h3 className="profil-title">☕ Lokasi : Jl. Air Dingin, Pekanbaru</h3>;
}

function Jam() {
  return <h3 className="profil-title">🕰️ Jam Buka : Senin - Minggu, 07.00 - 23.00 WIB</h3>;
}

function Temukan() {
  return (
    <div className="temukan-container">
      <h3 className="profil-title">📍 Temukan Kami :</h3>
      <div className="social-links">
        <a href="https://instagram.com/aromacoffee" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="social-icon" />
          Instagram
        </a>
        <a href="https://facebook.com/aromacoffee" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="social-icon" />
          Facebook
        </a>
      </div>
    </div>
  );
}

function Kontak() {
  return <h3 className="profil-title">📞 Hubungi : +62 812-3456-7890 (WA & Telp)</h3>;
}
