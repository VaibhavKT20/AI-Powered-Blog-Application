import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const TableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-yellow-50 transition-all">
      {/* Index */}
      <td className="px-2 sm:px-3 py-2 text-center font-semibold text-gray-700 text-xs sm:text-sm">
        {index}
      </td>

      {/* Title */}
      <td className="px-2 sm:px-3 py-2 text-gray-800 font-semibold hover:text-yellow-500 transition-colors cursor-pointer whitespace-normal">
        {title}
      </td>

      {/* Date */}
      <td className="px-2 sm:px-3 py-2 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
        {BlogDate.toLocaleDateString()}
      </td>

      {/* Published Status */}
      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
        <span
          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
            isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-2 sm:px-3 py-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={togglePublish}
            className={`px-2 sm:px-4 py-1 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all w-full sm:w-auto text-center ${
              isPublished
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>

          <button
            onClick={deleteBlog}
            className="w-full sm:w-auto flex justify-center items-center bg-red-100 text-red-700 rounded-xl px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm hover:bg-red-200 transition-all"
          >
            <img
              src={assets.cross_icon}
              alt="Delete"
              className="w-4 sm:w-5 h-4 sm:h-5"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
