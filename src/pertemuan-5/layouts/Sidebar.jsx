import { PiCoffeeBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import ListMenu from "../components/ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-30 flex-col bg-[var(--color-header)] p-6 shadow-lg text-[var(--color-white)]"
    >
      <div id="sidebar-logo" className="flex flex-col items-center mb-10">
        <span id="logo" className="text-[48px] text-amber-600 drop-shadow-md">
          <PiCoffeeBold />
        </span>
      </div>

      <ListMenu />

      <div id="sidebar-footer" className="mt-auto flex justify-center pt-10">
        <div className="text-[35px] text-[var(--color-white)] hover:text-yellow-300 transition">
          <FiLogOut />
        </div>
      </div>
    </div>
  );
}
