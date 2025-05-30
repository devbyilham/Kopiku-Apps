import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import CardCountData from "../data/CardCount.json";

export default function CardCount() {
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {CardCountData.map((item) => (
        <div
          key={item.id}
          className="bg-latar rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-32 bg-[#6c4432] flex items-center justify-center">
            <img
              src={item.gambar}
              alt={item.nama}
              className="h-24 object-contain"
            />
          </div>

          <div className="p-4 flex flex-col space-y-2 text-teks font-poppins">
            <h3 className="text-xl font-bold">{item.nama}</h3>
            <p className="text-sm text-gray-600">{item.deskripsi}</p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                <MdOutlinePayments className="text-2xl text-[#6c4432]" />
                <span className="text-lg font-semibold">
                  Rp {item.harga}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
