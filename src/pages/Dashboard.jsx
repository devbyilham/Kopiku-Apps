import PageHeader from "../components/PageHeader";
import CardCount from "../components/CardCount";
import StatBox from "../components/StatBox";
import DashboardCharts from "../components/DashboardChart";
import { GiCoffeeCup, GiCoffeeBeans } from "react-icons/gi";
import { PiBowlFoodBold } from "react-icons/pi";
import {
  FaIceCream,
  FaUserFriends,
  FaClipboardList,
  FaRegNewspaper,
  FaCalendarCheck,
} from "react-icons/fa";

export default function Dashboard() {
  const categories = [
    { label: "Topping", icon: <FaIceCream />, active: false },
    { label: "Kopi", icon: <GiCoffeeCup />, active: true },
    { label: "Bubuk Kopi", icon: <GiCoffeeBeans />, active: false },
    { label: "Snack", icon: <PiBowlFoodBold />, active: false },
  ];

  // Contoh data dummy statistik
  const stats = [
    { title: "Pengunjung", value: "1.253", icon: <FaUserFriends /> },
    { title: "Total Produk", value: "48", icon: <FaClipboardList /> },
    { title: "Total Artikel", value: "12", icon: <FaRegNewspaper /> },
    { title: "Total Booking", value: "36", icon: <FaCalendarCheck /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-header)] text-white px-6 py-4 space-y-6">
      <div className="w-[100%] h-[1px] bg-white opacity-60 rounded-full mx-auto mb-6" />
      <PageHeader title="Dashboard Kopiku" categories={categories} />

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatBox key={i} title={s.title} value={s.value} icon={s.icon} />
        ))}
      </div>

      {/* Grafik */}
      <DashboardCharts />

      {/* Daftar Menu */}
      <CardCount />
    </div>
  );
}
