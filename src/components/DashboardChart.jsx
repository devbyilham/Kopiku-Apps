// DashboardChart.jsx
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardChart() {
  const loginData = [
    { day: "Sen", jumlah: 30 },
    { day: "Sel", jumlah: 50 },
    { day: "Rab", jumlah: 40 },
    { day: "Kam", jumlah: 60 },
    { day: "Jum", jumlah: 35 },
    { day: "Sab", jumlah: 25 },
    { day: "Min", jumlah: 45 },
  ];

  const artikelData = [
    { name: "Espresso", views: 150 },
    { name: "Latte", views: 200 },
    { name: "Cappuccino", views: 180 },
    { name: "Americano", views: 90 },
  ];

  return (
    <div className="px-1 md:px-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      {/* Chart Login */}
      <div className="card bg-[#8b5e45] text-white shadow-md rounded-xl ">
        <div className="card-body">
          <h2 className="card-title">Login Pengguna</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="day" stroke="#f4eae6" />
              <YAxis stroke="#f4eae6" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="jumlah"
                stroke="#f08c50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Artikel Populer */}
      <div className="card bg-[#8b5e45] text-white shadow-md rounded-xl">
        <div className="card-body">
          <h2 className="card-title">Artikel Populer</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={artikelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="name" stroke="#f4eae6" />
              <YAxis stroke="#f4eae6" />
              <Tooltip />
              <Bar dataKey="views" fill="#f08c50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
