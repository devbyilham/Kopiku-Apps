import React from "react";
import { MdOutlinePayments } from "react-icons/md";
import CardCountData from "../data/CardCount.json";

export default function CardCount() {
  return (
    <div className="p-1 grid gap-6 sm:grid-cols-1 md:grid-cols-2 font-poppins">
      {CardCountData.map((item) => (
        <div
          key={item.id}
          className="card card-side bg-[#8b5e45] shadow-md rounded-xl overflow-hidden"
        >
          <figure className="w-32 h-full bg-[#754e3d]">
            <img
              src={item.gambar}
              alt={item.nama}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body text-[var(--color-white)]">
            <h2 className="card-title text-[var(--color-white)]">
              {item.nama}
            </h2>
            <p className="text-sm text-[var(--color-white)]">
              {item.deskripsi}
            </p>
            <div className="card-actions justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <MdOutlinePayments className="text-xl text-black" />
                <span className="text-base font-semibold text-black">
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
