import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

export default function Header() {
  const [advice, setAdvice] = useState("");
  const [adviceError, setAdviceError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const fetchedAdvice =
          response.data.slip.advice || "No advice available.";
        setAdvice(fetchedAdvice);
      })
      .catch(() => {
        setAdviceError("Failed to fetch advice.");
      });
  }, []);

  const adviceInfo = adviceError ? (
    <div className="bg-red-500 text-white mb-5 p-5 text-sm font-light rounded-lg shadow-md">
      {adviceError}
    </div>
  ) : (
    <div className="text-sm font-light">{advice}</div>
  );

  return (
    <div className="font-poppins flex justify-between items-center px-6 py-4 bg-[var(--color-header)] text-[var(--color-white)] shadow-md">
      <div className="flex flex-col">
        <p className="text-lg font-bold">Selamat datang di Kopiku</p>
        <h2>{adviceInfo}</h2>
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
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-4 ring-offset-2">
            <img src="/image/avatar.png" />
          </div>
        </div>
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
