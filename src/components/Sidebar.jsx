import { GiCoffeeCup } from "react-icons/gi";
import { PiCoffeeBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import ListMenu from "./ListMenu";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-20 flex-col bg-[var(--color-border)]  p-6 shadow-lg text-white font-poppins"
    >
      <div id="sidebar-logo" className="flex flex-col items-center">
        <span id="logo" className="text-[48px] drop-shadow-md">
          <GiCoffeeCup />
        </span>
      </div>

      <ListMenu />

      <div id="sidebar-footer" className="mt-auto flex justify-center pt-10">
        <Link to="/" className="text-[35px] hover:text-yellow-300 transition">
          <FiLogOut />
        </Link>
      </div>
    </div>
  );
}
