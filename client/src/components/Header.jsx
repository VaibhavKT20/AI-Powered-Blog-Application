import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Sparkles } from "lucide-react";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-6 sm:mx-16 xl:mx-32 relative">
      {/* Content */}
      <div className="text-center mt-24 mb-12 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center justify-center gap-3 px-6 py-1.5 mb-6 border border-yellow-500/30 rounded-full text-sm font-medium text-yellow-600 bg-yellow-50 shadow-sm animate-pulse">
          <p className="flex items-center gap-1 text-yellow-500 font-semibold text-sm sm:text-base">
            <Sparkles className="w-4 h-4" />
            New: AI Feature Integrated
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold sm:leading-tight text-gray-900">
          Turn Your Ideas Into{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            Stories
          </span>{" "}
          <br /> That Inspire.
        </h1>

        {/* Subtext */}
        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-gray-600 leading-relaxed text-sm sm:text-base">
          A modern space to express yourself freely — from quick thoughts to
          deep reflections. Write, share, and connect with readers who are ready
          to listen.{" "}
          <span className="text-gray-800 font-medium">
            Because every story deserves a voice.
          </span>
        </p>

        {/* Search Bar */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg mx-auto mt-8 border border-gray-200 bg-white rounded-full shadow-lg overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="🔍 Search for blogs..."
            required
            className="w-full pl-5 py-3 text-sm sm:text-base outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-2.5 rounded-full m-1.5 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Clear Search */}
      <div className="text-center mt-4">
        {input && (
          <button
            onClick={onClear}
            className="border border-gray-300 text-gray-500 font-light text-xs py-1 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all cursor-pointer"
          >
            ✖ Clear Search
          </button>
        )}
      </div>

      {/* Background gradient */}
      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] opacity-40 blur-2xl"
      />
    </div>
  );
};

export default Header;
