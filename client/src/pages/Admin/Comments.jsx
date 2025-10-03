import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-6 sm:pt-10 px-4 sm:px-8 md:px-16 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 min-h-screen">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-5xl mx-auto mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
          Comments
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("Approved")}
            className={`px-4 sm:px-5 py-2 rounded-full shadow-md border transition-all text-sm font-semibold ${
              filter === "Approved"
                ? "bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-100"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-4 sm:px-5 py-2 rounded-full shadow-md border transition-all text-sm font-semibold ${
              filter === "Not Approved"
                ? "bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-100"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="relative max-w-6xl mx-auto overflow-x-auto bg-white shadow-2xl rounded-2xl border border-yellow-200">
        <table className="w-full min-w-[600px] sm:min-w-full text-sm text-gray-700 table-auto">
          <thead className="text-xs uppercase bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">
                Blog Title & Comment
              </th>
              <th className="px-4 sm:px-6 py-4 max-sm:hidden font-semibold text-left">
                Date
              </th>
              <th className="px-4 sm:px-6 py-4 font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comments
              .filter((comment) =>
                filter === "Approved" ? comment.isApproved : !comment.isApproved
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>

        {/* Mobile fallback: Stack view */}
        <div className="sm:hidden flex flex-col divide-y divide-gray-100 p-4">
          {comments
            .filter((comment) =>
              filter === "Approved" ? comment.isApproved : !comment.isApproved
            )
            .map((comment, index) => (
              <div key={comment._id} className="pb-4">
                <p className="font-semibold text-gray-700 mb-1">
                  {comment.blog?.title}
                </p>
                <p className="text-gray-600 mb-1">Comment: {comment.content}</p>
                <p className="text-gray-500 text-xs mb-1">
                  Date: {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  {/* You can reuse approve/delete buttons here if needed */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
