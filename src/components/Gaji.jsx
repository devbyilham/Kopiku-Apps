export default function Gaji({ label, type, placeholder, onChange }) {
  return (
    <div className=" font-poppins">
      <label className="block text-white text-lg font-semibold ">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 rounded text-black bg-white"
        onChange={onChange}
      />
    </div>
  );
}
