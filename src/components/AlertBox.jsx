export default function AlertBox({ type, children }) {
  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
  return (
    <div
      className={`${bgColor} text-white p-3 rounded-lg text-center shadow-md mb-4`}
    >
      {children}
    </div>
  );
}
