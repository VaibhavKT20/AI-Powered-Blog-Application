import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-screen pt-6 bg-white shadow-md">
      {/* Dashboard */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer rounded-r-2xl transition-all hover:bg-yellow-50 ${
            isActive ? "bg-yellow-100 border-r-4 border-yellow-500" : ""
          }`
        }
      >
        <img
          src={assets.home_icon}
          alt="Dashboard"
          className="w-5 h-5 min-w-5"
        />
        <p className="hidden md:inline-block font-medium text-gray-700">
          Dashboard
        </p>
      </NavLink>

      {/* Add Blog */}
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer rounded-r-2xl transition-all hover:bg-yellow-50 ${
            isActive ? "bg-yellow-100 border-r-4 border-yellow-500" : ""
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Blog" className="w-5 h-5 min-w-5" />
        <p className="hidden md:inline-block font-medium text-gray-700">
          Add Blogs
        </p>
      </NavLink>

      {/* Blog List */}
      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer rounded-r-2xl transition-all hover:bg-yellow-50 ${
            isActive ? "bg-yellow-100 border-r-4 border-yellow-500" : ""
          }`
        }
      >
        <img
          src={assets.list_icon}
          alt="Blog List"
          className="w-5 h-5 min-w-5"
        />
        <p className="hidden md:inline-block font-medium text-gray-700">
          Blog Lists
        </p>
      </NavLink>

      {/* Comments */}
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-4 py-4 px-4 md:px-6 cursor-pointer rounded-r-2xl transition-all hover:bg-yellow-50 ${
            isActive ? "bg-yellow-100 border-r-4 border-yellow-500" : ""
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt="Comments"
          className="w-5 h-5 min-w-5"
        />
        <p className="hidden md:inline-block font-medium text-gray-700">
          Comments
        </p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
