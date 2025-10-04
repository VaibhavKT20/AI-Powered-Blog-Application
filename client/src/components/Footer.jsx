import React from "react";
import { assets, footer_data } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 py-10 sm:py-14">
        {/* Top Section: Logo + Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-14 lg:gap-24">
          {/* Logo and Description */}
          <div className="flex-1 min-w-[200px] sm:min-w-[260px]">
            <img
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              src={assets.new_word_nest_logo}
              alt="logo"
              className="w-36 sm:w-44 lg:w-52 xl:w-56 cursor-pointer mb-4 sm:mb-6"
            />
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              WordNest is your golden space to share ideas, explore thoughts,
              and inspire others. Write freely and let your voice shine.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex-1 w-full mt-8 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {footer_data.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-white text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm sm:text-base"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 border-t border-gray-700 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            &copy; {currentYear}{" "}
            <span className="text-white font-medium">WordNest</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
