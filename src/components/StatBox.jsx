export default function StatBox({ title, value, icon }) {
  return (
    <div className="bg-[#8b5e45] rounded-xl p-5 shadow-md flex items-center gap-4">
      <div className="text-3xl text-white">{icon}</div>
      <div>
        <p className="text-white/70 text-sm">{title}</p>
        <h3 className="text-xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
