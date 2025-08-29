import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navber = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-4 px-6 sm:px-16 xl:px-32 bg-white shadow-md">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.new_logo}
        alt="logo"
        className="w-48 sm:w-60 cursor-pointer"
      />

      {/* Button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-2.5 shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
      >
        {token ? "Dashboard" : "Login"}
        <img
          src={assets.arrow}
          className="w-3 invert brightness-0"
          alt="arrow"
        />
      </button>
    </div>
  );
};

export default Navber;
