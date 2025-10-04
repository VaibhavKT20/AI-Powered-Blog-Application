import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import TableItem from "../../components/admin/TableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-12 bg-gradient-to-br from-white via-yellow-50 to-white min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: assets.dashboard_icon_1,
            value: dashboardData.blogs,
            label: "Blogs",
          },
          {
            icon: assets.dashboard_icon_2,
            value: dashboardData.comments,
            label: "Comments",
          },
          {
            icon: assets.dashboard_icon_3,
            value: dashboardData.drafts,
            label: "Drafts",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-md border border-yellow-100 
                     hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <img src={card.icon} alt={card.label} className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-gray-500 font-medium">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs Table */}
      <div className="w-full">
        <div className="flex items-center gap-3 mb-4 text-gray-800 font-semibold text-lg">
          <img
            src={assets.dashboard_icon_4}
            alt="Latest Blogs"
            className="w-6 h-6"
          />
          <p>Latest Blogs</p>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg border border-yellow-200 bg-white">
          {/* Desktop / Tablet Table */}
          <table className="w-full text-sm text-gray-700 border-collapse min-w-[600px] sm:min-w-full hidden sm:table">
            <thead className="bg-yellow-50 text-xs uppercase text-gray-700 tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Blog Title</th>
                <th className="px-4 py-3 max-sm:hidden text-left">Date</th>
                <th className="px-4 py-3 max-sm:hidden text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.recentBlogs.map((blog, index) => (
                <TableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>

          {/* Mobile Stacked View */}
          <div className="sm:hidden flex flex-col divide-y divide-gray-200 p-4">
            {dashboardData.recentBlogs.map((blog, index) => (
              <div key={blog._id} className="pb-4">
                <p className="font-semibold text-gray-700 mb-1">
                  {index + 1}. {blog.title}
                </p>
                <p className="text-gray-500 text-xs mb-1">
                  Date: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs mb-1">
                  Status: {blog.isPublished ? "Published" : "Unpublished"}
                </p>
                <div className="flex gap-2 mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
