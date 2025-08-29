import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 my-32 relative z-10">
      {/* Heading */}
      <h1 className="md:text-4xl text-2xl font-extrabold text-gray-900">
        Never Miss a{" "}
        <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Blog
        </span>
        !
      </h1>

      {/* Subtext */}
      <p className="md:text-lg text-gray-500/80 max-w-xl">
        Subscribe to get the latest blogs, new tech insights, and exclusive news
        directly in your inbox.
      </p>

      {/* Form */}
      <form className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
        <input
          type="email"
          placeholder="Enter your email id"
          required
          className="flex-1 px-5 text-gray-600 outline-none h-full rounded-l-full"
        />
        <button
          type="submit"
          className="h-full px-10 md:px-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-r-full shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 cursor-pointer"
        >
          Subscribe
        </button>
      </form>

      {/* Decorative Background Blur */}
      <div className="absolute -z-10 w-80 h-80 bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-30 rounded-full filter blur-3xl top-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default Newsletter;
