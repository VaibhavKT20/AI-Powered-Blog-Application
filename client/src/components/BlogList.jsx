import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!blogs) return []; // If blogs is undefined, return empty array
    if (input === "") return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="relative">
      {/* Menu */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 my-8 sm:my-12 mx-4 sm:mx-0 relative">
        {blogCategories.map((item) => (
          <motion.div
            key={item}
            className="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                menu === item
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-md"
                ></motion.div>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Blog Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-24 px-4 sm:px-16 lg:px-24 xl:px-40"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <motion.div
              key={blog._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer"
              >
                <BlogCard blog={blog} />
              </motion.div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default BlogList;
