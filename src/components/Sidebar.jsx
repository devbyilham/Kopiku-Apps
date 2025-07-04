import { useState } from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import ListMenu from "./ListMenu";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openKategori, setOpenKategori] = useState("");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setOpenKategori("");
    }
  };

  const handleCategoryToggle = (category) => {
    if (!isExpanded) {
      setIsExpanded(true);
      if (category !== "dashboard") {
        setOpenKategori(category);
      } else {
        setOpenKategori("");
      }
    } else {
      if (category === "dashboard") {
        setOpenKategori("");
      } else {
        setOpenKategori((prev) => (prev === category ? "" : category));
      }
    }
  };

  return (
    <div
      id="sidebar"
      className={`flex min-h-screen ${
        isExpanded ? "w-64" : "w-20"
      } flex-col bg-[var(--color-border)] p-6 shadow-lg text-white font-poppins transition-all duration-300 ease-in-out`}
    >
      <div id="sidebar-logo" className="flex flex-col items-center">
        <span
          id="logo"
          className="text-[50px] drop-shadow-md cursor-pointer"
          onClick={toggleSidebar}
        >
          <GiCoffeeCup />
        </span>
      </div>

      <ListMenu
        isSidebarExpanded={isExpanded}
        openKategori={openKategori}
        onCategoryToggle={handleCategoryToggle}
      />

      <div id="sidebar-footer" className="mt-auto flex justify-center pt-10">
        <Link to="/" className="text-[30px] hover:text-yellow-300 transition">
          <FiLogOut />
        </Link>
      </div>
    </div>
  );
}
