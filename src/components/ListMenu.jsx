import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiFoodMenu, BiSearchAlt2 } from "react-icons/bi";
import { MdArticle, MdRateReview, MdPermMedia } from "react-icons/md";
import {
  FaQuestionCircle,
  FaFolder,
  FaBuilding,
  FaRegCommentDots,
  FaUserAlt,
} from "react-icons/fa";
import { RiTeamFill, RiProfileFill } from "react-icons/ri";
import {
  AiOutlineBook,
  AiFillContacts,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";

export default function ListMenu({
  isSidebarExpanded,
  openKategori,
  onCategoryToggle,
}) {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-2 text-[16px] px-3 py-1 rounded transition duration-200 w-full
      ${
        isActive
          ? "text-[var(--color-primary)] "
          : "text-white hover:text-[var(--color-primary)]"
      }
      ${isSidebarExpanded ? "justify-start" : "justify-center"}`;

  const iconClass = `text-[30px] cursor-pointer text-white hover:text-[var(--color-primary)]`;

  return (
    <div id="sidebar-menu" className="mt-20 font-poppins w-full">
      <ul className="space-y-4 flex flex-col items-center">
        <li className="w-full flex flex-col items-center">
          <div
            onClick={() => onCategoryToggle("dashboard")}
            className={`flex items-center gap-2 w-full ${iconClass} ${
              isSidebarExpanded ? "px-3 justify-start" : "justify-center"
            }`}
          >
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 flex-grow ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-white hover:text-[var(--color-primary)]"
                }`
              }
            >
              <GoHomeFill />
              {isSidebarExpanded && (
                <span className="text-[16px] text-white">Dashboard</span>
              )}
            </NavLink>
          </div>
        </li>

        {/* === KONTEN === */}
        <li className="w-full flex flex-col items-center">
          <div
            onClick={() => onCategoryToggle("konten")}
            className={`flex items-center gap-2 w-full ${iconClass} ${
              isSidebarExpanded ? "px-3 justify-start" : "justify-center"
            }`}
          >
            <FaFolder />
            {isSidebarExpanded && (
              <span className="text-[16px] text-white">Content</span>
            )}
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              openKategori === "konten" && isSidebarExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } w-full`}
          >
            <ul className="mt-2 space-y-1 w-full px-2">
              <li>
                <NavLink to="menu" className={menuClass}>
                  <BiFoodMenu /> {isSidebarExpanded && "Menu"}
                </NavLink>
              </li>
              <li>
                <NavLink to="artikel" className={menuClass}>
                  <MdArticle /> {isSidebarExpanded && "Artikel"}
                </NavLink>
              </li>
              <li>
                <NavLink to="faq" className={menuClass}>
                  <FaQuestionCircle /> {isSidebarExpanded && "FAQ"}
                </NavLink>
              </li>
              <li>
                <NavLink to="testimoni" className={menuClass}>
                  <MdRateReview /> {isSidebarExpanded && "Testimoni"}
                </NavLink>
              </li>
              <li>
                <NavLink to="galeri" className={menuClass}>
                  <MdPermMedia /> {isSidebarExpanded && "Galeri"}
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* === ORGANISASI === */}
        <li className="w-full flex flex-col items-center">
          <div
            onClick={() => onCategoryToggle("organisasi")}
            className={`flex items-center gap-2 w-full ${iconClass} ${
              isSidebarExpanded ? "px-3 justify-start" : "justify-center"
            }`}
          >
            <FaBuilding />
            {isSidebarExpanded && (
              <span className="text-[16px] text-white">About Us</span>
            )}
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              openKategori === "organisasi" && isSidebarExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } w-full`}
          >
            <ul className="mt-2 space-y-1 w-full px-2">
              <li>
                <NavLink to="team" className={menuClass}>
                  <RiTeamFill /> {isSidebarExpanded && "Team"}
                </NavLink>
              </li>
              <li>
                <NavLink to="loker" className={menuClass}>
                  <BiSearchAlt2 /> {isSidebarExpanded && "Loker"}
                </NavLink>
              </li>
              <li>
                <NavLink to="profil" className={menuClass}>
                  <RiProfileFill /> {isSidebarExpanded && "Profil"}
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* === INTERAKSI === */}
        <li className="w-full flex flex-col items-center">
          <div
            onClick={() => onCategoryToggle("interaksi")}
            className={`flex items-center gap-2 w-full ${iconClass} ${
              isSidebarExpanded ? "px-3 justify-start" : "justify-center"
            }`}
          >
            <FaRegCommentDots />
            {isSidebarExpanded && (
              <span className="text-[16px] text-white">Services</span>
            )}
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              openKategori === "interaksi" && isSidebarExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } w-full`}
          >
            <ul className="mt-2 space-y-1 w-full px-2">
              <li>
                <NavLink to="booking" className={menuClass}>
                  <AiOutlineBook /> {isSidebarExpanded && "Booking"}
                </NavLink>
              </li>
              <li>
                <NavLink to="contact" className={menuClass}>
                  <AiFillContacts /> {isSidebarExpanded && "Kontak"}
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* === USER === */}
        <li className="w-full flex flex-col items-center">
          <div
            onClick={() => onCategoryToggle("user")}
            className={`flex items-center gap-2 w-full ${iconClass} ${
              isSidebarExpanded ? "px-3 justify-start" : "justify-center"
            }`}
          >
            <FaUserAlt />
            {isSidebarExpanded && (
              <span className="text-[16px] text-white">Management</span>
            )}
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              openKategori === "user" && isSidebarExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } w-full`}
          >
            <ul className="mt-2 space-y-1 w-full px-2">
              <li>
                <NavLink to="user" className={menuClass}>
                  <AiOutlineUserSwitch />{" "}
                  {isSidebarExpanded && "Manajemen User"}
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
