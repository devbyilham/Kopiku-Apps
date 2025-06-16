import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background curves */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#523628] rounded-br-[100%] z-0"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#523628] rounded-tl-[100%] z-0"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl font-extrabold text-black mb-4">{code}</h1>
        <p className="text-2xl mb-8 text-black">{description}</p>
        <img
          src={image}
          alt={`${code} Illustration`}
          className="mx-auto mb-8 w-80 md:w-[400px]"
        />
        <button
          onClick={() => navigate("/")}
          className="text-lg px-8 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition duration-200"
        >
          ⤶ Go Home
        </button>
      </div>
    </div>
  );
}
