import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-2xl overflow-hidden relative bg-white shadow-md border border-gray-100
                 hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 cursor-pointer
                 group hover:-translate-y-1 sm:hover:-translate-y-2"
    >
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

        {/* Category Badge */}
        <span
          className="absolute bottom-3 left-3 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium tracking-wide
                     bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full shadow-md
                     group-hover:scale-105 transition-transform"
        >
          {category}
        </span>
      </div>

      {/* Blog Content */}
      <div className="p-4 sm:p-5 relative z-10">
        {/* Title */}
        <h5
          className="mb-2 font-semibold text-base sm:text-lg md:text-xl text-gray-900 line-clamp-2
                     group-hover:text-yellow-600 transition-colors duration-300"
        >
          {title}
        </h5>

        {/* Description */}
        <p
          className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors duration-300"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>

        {/* Read More → CTA */}
        <div className="mt-3 sm:mt-4 flex items-center gap-2 text-yellow-600 font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span>Read More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
