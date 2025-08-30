import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-14">
        {/* Top Section: Logo + Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 lg:gap-24">
          {/* Logo & Description */}
          <div className="flex-1 min-w-[260px]">
            <img
              onClick={() => (window.location.href = "/")}
              src={assets.new_word_nest_logo}
              alt="logo"
              className="w-44 sm:w-52 lg:w-56 cursor-pointer mb-6"
            />
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              WordNest is your golden space to share ideas, explore thoughts,
              and inspire others. Write freely and let your voice shine.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
              {footer_data.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-white text-base md:text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
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
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm md:text-base text-gray-400">
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
