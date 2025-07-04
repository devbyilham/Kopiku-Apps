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
    { day: "Mon", jumlah: 30 },
    { day: "Tue", jumlah: 50 },
    { day: "Wed", jumlah: 40 },
    { day: "Thu", jumlah: 60 },
    { day: "Fri", jumlah: 35 },
    { day: "Sat", jumlah: 25 },
    { day: "Sun", jumlah: 45 },
  ];

  const artikelData = [
    { name: "Espresso", views: 150 },
    { name: "Latte", views: 200 },
    { name: "Cappuccino", views: 180 },
    { name: "Americano", views: 90 },
  ];

  const bookingData = [
    { day: "Mon", total: 10 },
    { day: "Tue", total: 14 },
    { day: "Wed", total: 12 },
    { day: "Thu", total: 18 },
    { day: "Fri", total: 20 },
    { day: "Sat", total: 22 },
    { day: "Sun", total: 15 },
  ];

  return (
    <div className="px-1 md:px-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
      {/* Login Chart */}
      <div className="card bg-[#8b5e45] text-white shadow-md rounded-xl">
        <div className="card-body">
          <h2 className="card-title">User Logins</h2>
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

      {/* Booking Chart */}
      <div className="card bg-[#8b5e45] text-white shadow-md rounded-xl">
        <div className="card-body">
          <h2 className="card-title">Booking Statistics</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="day" stroke="#f4eae6" />
              <YAxis stroke="#f4eae6" />
              <Tooltip />
              <Bar dataKey="total" fill="#f08c50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Articles Chart */}
      <div className="card bg-[#8b5e45] text-white shadow-md rounded-xl">
        <div className="card-body">
          <h2 className="card-title">Popular Articles</h2>
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
