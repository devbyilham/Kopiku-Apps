export default function InputField({ label, type, placeholder, value, onChange, onBlur, error }) {
  return (
    <div className="mb-1 font-poppins">
      <label className="block text-white text-md font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-1 border border-gray-400 rounded-md bg-white text-gray-800"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
