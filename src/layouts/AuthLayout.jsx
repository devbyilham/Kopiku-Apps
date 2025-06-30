import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-header)]  font-[Poppins]">
      <div className="bg-[var(--color-border)] p-8 rounded-2xl shadow-lg w-full max-w-lg text-white">
        {/* Icon Kopi */}
        <div className="flex justify-center mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="Coffee Icon"
            className="w-16 h-16"
          />
        </div>
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-extrabold">
            <span className="text-white">Kopi</span>
            <span className="text-[var(--color-primary)] ">Ku</span>
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-sm text-[#e2cfc3] mt-6">
          © 2025 Coffee Shop Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
}
