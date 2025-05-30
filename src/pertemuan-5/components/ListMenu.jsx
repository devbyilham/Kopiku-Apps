import { VscListSelection } from "react-icons/vsc";
import { RiDiscountPercentLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { FaWallet } from "react-icons/fa";
import { PiUserCircleGearThin } from "react-icons/pi";

export default function ListMenu() {
  return (
    <div id="sidebar-menu" className="mt-10">
      <ul id="menu-list" className="space-y-6 flex flex-col items-center">
        <li>
          <div
            id="menu-1"
            className="text-[30px] text-[var(--color-white)] hover:text-[var(--color-primary)] transition duration-200"
          >
            <GoHomeFill />
          </div>
        </li>
        <li>
          <div
            id="menu-2"
            className="text-[30px] text-[var(--color-white)] hover:text-[var(--color-primary)] transition duration-200"
          >
            <RiDiscountPercentLine />
          </div>
        </li>
        <li>
          <div
            id="menu-3"
            className="text-[30px] text-[var(--color-white)] hover:text-[var(--color-primary)] transition duration-200"
          >
            <VscListSelection />
          </div>
        </li>
        <li>
          <div
            id="menu-4"
            className="text-[30px] text-[var(--color-white)] hover:text-[var(--color-primary)] transition duration-200"
          >
            <FaWallet />
          </div>
        </li>
        <li>
          <div
            id="menu-5"
            className="text-[30px] text-[var(--color-white)] hover:text-[var(--color-primary)] transition duration-200"
          >
            <PiUserCircleGearThin />
          </div>
        </li>
      </ul>
    </div>
  );
}
