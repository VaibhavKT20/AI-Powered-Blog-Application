import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
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
    <div className="flex-1 pt-8 px-5 sm:pt-14 sm:px-16 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 min-h-screen">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-4xl mx-auto mb-8 gap-4">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
          Comments
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("Approved")}
            className={`px-5 py-2 rounded-full shadow-md border transition-all text-sm font-semibold ${
              filter === "Approved"
                ? "bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-100"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-5 py-2 rounded-full shadow-md border transition-all text-sm font-semibold ${
              filter === "Not Approved"
                ? "bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-100"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative max-w-5xl mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl border border-yellow-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-xs uppercase bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 rounded-t-3xl">
            <tr>
              <th scope="col" className="px-6 py-4 text-left font-semibold">
                Blog Title & Comment
              </th>
              <th
                scope="col"
                className="px-6 py-4 max-sm:hidden font-semibold text-left"
              >
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-center">
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
      </div>
    </div>
  );
};

export default Comments;
