import { AiFillContacts } from "react-icons/ai";
import { AiOutlineBook } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { VscListSelection } from "react-icons/vsc";
import { GoHomeFill } from "react-icons/go";
import { BiErrorCircle } from "react-icons/bi";
import { BiMessageSquareError } from "react-icons/bi";
import { BiError } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function ListMenu() {
  const menuClass = ({ isActive }) =>
    `text-[30px] transition duration-200
     ${
       isActive
         ? "text-[var(--color-primary)]"
         : "text-[var(--color-white)] hover:text-[var(--color-primary)]"
     }`;

  return (
    <div id="sidebar-menu" className="mt-20">
      <ul id="menu-list" className="space-y-6 flex flex-col items-center">
        <li>
          <NavLink id="menu-1" to="/" className={menuClass}>
            <GoHomeFill />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-2" to="menu" className={menuClass}>
            <VscListSelection />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-3" to="loker" className={menuClass}>
            <BiSearchAlt2 />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-4" to="profil" className={menuClass}>
            <CgProfile />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-5" to="error400" className={menuClass}>
            <BiErrorCircle />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-6" to="error401" className={menuClass}>
            <BiError />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-7" to="error403" className={menuClass}>
            <BiMessageSquareError />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-8" to="faq" className={menuClass}>
            <FaQuestionCircle />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-9" to="team" className={menuClass}>
            <RiTeamFill />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-10" to="booking" className={menuClass}>
            <AiOutlineBook />
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-11" to="contact" className={menuClass}>
            <AiFillContacts />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
