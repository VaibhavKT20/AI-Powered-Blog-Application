import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-300 border-t-yellow-500 animate-spin shadow-lg"></div>
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-yellow-100 opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
