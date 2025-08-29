import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import TableItem from "../../components/admin/TableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-6 px-5 sm:pt-12 sm:pl-16 bg-gray-50">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        📚 All Blogs
      </h1>

      {/* Table Container */}
      <div className="relative max-w-6xl overflow-x-auto rounded-2xl shadow-md border border-gray-100 bg-white">
        <table className="w-full text-sm text-gray-600 border-collapse">
          <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-center font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Blog Title</th>
              <th className="px-4 py-3 max-sm:hidden font-semibold">Date</th>
              <th className="px-4 py-3 max-sm:hidden font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((blog, index) => (
              <TableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <p className="mt-5 text-gray-400 text-xs text-center">
        💡 Tip: Scroll horizontally on smaller screens to view all details.
      </p>
    </div>
  );
};

export default ListBlog;
