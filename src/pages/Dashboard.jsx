import PageHeader from "../components/PageHeader";
import CardCount from "../components/CardCount";
import { GiCoffeeCup, GiCoffeeBeans } from "react-icons/gi";
import { PiBowlFoodBold } from "react-icons/pi";
import { FaIceCream } from "react-icons/fa";

export default function Dashboard() {
  const categories = [
    { label: "Topping", icon: <FaIceCream />, active: false },
    { label: "Kopi", icon: <GiCoffeeCup />, active: true },
    { label: "Bubuk Kopi", icon: <GiCoffeeBeans />, active: false },
    { label: "Snack", icon: <PiBowlFoodBold />, active: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-header)] text-white">
      <div className="w-[97%] h-[1px] bg-white opacity-60 mx-auto mb-4"></div>
      <PageHeader title="Menu Kopi" categories={categories} />
      <CardCount />
    </div>
  );
}
