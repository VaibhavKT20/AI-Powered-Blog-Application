import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header
        className="flex items-center justify-between h-[60px] sm:h-[70px] px-3 sm:px-8 md:px-12 
        bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50"
      >
        {/* Logo */}
        <img
          src={assets.new_word_nest_logo}
          alt="Logo"
          className="w-32 sm:w-44 md:w-52 lg:w-60 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/")}
        />

        {/* Logout Button */}
        <button
          onClick={logout}
          className="text-xs sm:text-sm px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 
          bg-gradient-to-r from-yellow-400 to-yellow-500 
          text-white font-medium rounded-full shadow-md
          hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 
          transition-all duration-300 cursor-pointer"
        >
          Logout
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-70px)] bg-gray-50">
        {/* Sidebar (Desktop and Tablet) */}
        <aside className="hidden md:flex flex-col w-52 lg:w-60 xl:w-64 bg-white border-r border-gray-100 shadow-md">
          <Sidebar />
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-10 md:ml-0">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Sidebar (Bottom Nav) */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
          <Sidebar mobile />
        </div>

        {/* Add bottom padding on content to prevent overlap with mobile sidebar */}
        <div className="md:hidden h-16"></div>
      </div>
    </>
  );
};

export default Layout;
