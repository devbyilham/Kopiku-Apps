export default function LoadingSpinner({ text = "Memuat data..." }) {
  return (
    <div className="p-8 text-center text-white text-lg font-medium">
      <div className="animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-white rounded-full mr-2"></div>
      {text}
    </div>
  );
}
