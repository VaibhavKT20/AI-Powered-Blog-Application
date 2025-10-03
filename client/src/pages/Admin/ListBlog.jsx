import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import TableItem from "../../components/admin/TableItem";
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
    <div className="flex-1 pt-6 px-2 sm:px-4 md:px-6 lg:px-8 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
        📚 All Blogs
      </h1>

      {/* Table Container */}
      <div className="relative w-full overflow-x-auto rounded-xl shadow-md border border-gray-100 bg-white">
        <table className="w-full min-w-[400px] sm:min-w-[600px] text-xs sm:text-sm md:text-base text-gray-600 border-collapse">
          <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700 text-[10px] sm:text-xs md:text-sm uppercase tracking-wide">
            <tr>
              <th className="px-2 sm:px-3 py-2 text-center font-semibold">#</th>
              <th className="px-2 sm:px-3 py-2 text-left font-semibold">
                Blog Title
              </th>
              <th className="px-2 sm:px-3 py-2 hidden sm:table-cell font-semibold">
                Date
              </th>
              <th className="px-2 sm:px-3 py-2 hidden sm:table-cell font-semibold">
                Status
              </th>
              <th className="px-2 sm:px-3 py-2 text-center font-semibold">
                Action
              </th>
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
      <p className="mt-3 sm:mt-4 text-gray-400 text-[10px] sm:text-xs text-center px-2">
        💡 Tip: Scroll horizontally on smaller screens to view all details.
      </p>
    </div>
  );
};

export default ListBlog;
