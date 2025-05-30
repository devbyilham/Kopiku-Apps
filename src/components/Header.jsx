import { FaSearch } from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[var(--color-header)] text-[var(--color-white)] shadow-md">
      <div className="flex flex-col">
        <p className="text-sm">Selamat datang di Doge Coffee Dashboard!</p>
        <h2 className="text-lg font-bold">Always give the best service</h2>
      </div>

      <div className="relative w-full max-w-md mx-8">
        <input
          type="text"
          placeholder="cari menu"
          className="text-center w-full px-4 py-2 pr-10 rounded-full bg-[var(--color-accent)] text-[var(--color-white)] placeholder:text-white/60 outline-none border border-white/20"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-xl hover:text-yellow-300 transition">
          <RiNotification4Line />
        </div>

        <img
          src="https://avatar.iran.liara.run/public/28"
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-yellow-300"
        />

        <div className="flex flex-col text-sm">
          <span className="text-white/80">admin</span>
          <span className="font-bold">Diego</span>
        </div>

        <button className="flex items-center gap-1 bg-white/90 hover:bg-white text-[var(--color-header)] font-semibold px-3 py-1 rounded-md text-sm shadow-sm transition">
          <AiOutlinePlus className="text-base" />
          Add menu
        </button>
      </div>
    </div>
  );
}
