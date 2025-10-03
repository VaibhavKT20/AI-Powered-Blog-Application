import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ mobile }) => {
  const baseClasses =
    "flex items-center gap-2 sm:gap-4 py-4 px-2 sm:px-4 md:px-6 cursor-pointer rounded-r-2xl transition-all hover:bg-yellow-50";
  const activeClasses = "bg-yellow-100 border-r-4 border-yellow-500";

  const links = [
    { to: "/admin", label: "Dashboard", icon: assets.home_icon },
    { to: "/admin/addBlog", label: "Add Blogs", icon: assets.add_icon },
    { to: "/admin/listBlog", label: "Blog Lists", icon: assets.list_icon },
    { to: "/admin/comments", label: "Comments", icon: assets.comment_icon },
  ];

  return (
    <div
      className={`flex ${
        mobile
          ? "flex-row justify-around w-full fixed bottom-0 left-0 border-t border-gray-200 bg-white z-50 shadow-md py-2"
          : "flex-col min-h-screen w-20 sm:w-24 md:w-60 border-r border-gray-200 bg-white shadow-md pt-6"
      }`}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : ""} ${
              mobile ? "justify-center" : ""
            }`
          }
        >
          <img
            src={link.icon}
            alt={link.label}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          {!mobile && (
            <p className="hidden md:inline-block font-medium text-gray-700 text-sm sm:text-base">
              {link.label}
            </p>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
