import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const TableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      const response = await axios.post("/api/blog/delete", { id: blog._id });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const togglePublish = async () => {
    try {
      const response = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-yellow-50 transition-all">
      {/* Index */}
      <th className="px-5 py-4 text-center font-semibold text-gray-700">
        {index + 1}
      </th>

      {/* Title */}
      <td className="px-5 py-4 text-gray-800 font-semibold hover:text-yellow-500 transition-colors cursor-pointer">
        {blog.title}
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-gray-500 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* Published Status */}
      <td className="px-5 py-4 max-sm:hidden">
        <span
          className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
            blog.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4 flex items-center gap-3">
        <button
          onClick={togglePublish}
          className={`px-4 py-1 rounded-xl text-sm font-semibold shadow-sm transition-all ${
            blog.isPublished
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          alt="Delete"
          onClick={deleteBlog}
          className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </td>
    </tr>
  );
};

export default TableItem;
