export default function EmptyState({ text = "Tidak ada data ditemukan." }) {
  return (
    <div className="p-8 text-center text-white/70 text-lg font-medium font-poppins">
      {text}
    </div>
  );
}
