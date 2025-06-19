export default function Gaji({ label, type, placeholder, onChange }) {
  return (
    <div className="mb-1 font-poppins">
      <label className="block text-white text-lg font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-0 border border-gray-300 rounded bg-white text-gray-800 text-lg focus:ring-2 focus:ring-[#f08c50] focus:outline-none hover:shadow-lg transition-all"
        onChange={onChange}
      />
    </div>
  );
}
