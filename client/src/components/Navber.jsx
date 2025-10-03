import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navber = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-4 px-4 sm:px-8 md:px-16 xl:px-32 bg-white shadow-md">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.new_word_nest_logo}
        alt="logo"
        className="w-36 sm:w-44 md:w-56 lg:w-60 cursor-pointer"
      />

      {/* Button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 w-full sm:w-auto justify-center"
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
