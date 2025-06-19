import { PiCoffeeBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-20 flex-col bg-[#754e3d] p-6 shadow-lg text-white font-poppins"
    >
      <div id="sidebar-logo" className="flex flex-col items-center mb-10">
        <span id="logo" className="text-[48px] text-[#f08c50] drop-shadow-md">
          <PiCoffeeBold />
        </span>
      </div>

      <ListMenu />

      <div id="sidebar-footer" className="mt-auto flex justify-center pt-10">
        <div className="text-[35px] hover:text-yellow-300 transition">
          <FiLogOut />
        </div>
      </div>
    </div>
  );
}
