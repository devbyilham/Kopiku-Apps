import React from "react";

export default function PageHeader({ categories, title }) {
  return (
    <div className="bg-[var(--color-header)] pt-4 pb-10">
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`rounded-full py-2 px-6 flex items-center justify-center space-x-2 transition ${
              category.active
                ? "bg-[var(--color-primary)] text-[var(--color-white)]"
                : "bg-[var(--color-gray)] text-[var(--color-header)] hover:bg-[var(--color-hover)]"
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.label}</span>
          </div>
        ))}
      </div>
      

      <div className="px-6">
        <h1 className="text-2xl text-[var(--color-white)] font-semibold">{title}</h1>
      </div>
    </div>
  );
}
