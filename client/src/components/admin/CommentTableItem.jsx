import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogsDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const response = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirm) return;

    try {
      const response = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        fetchComments();
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
      {/* Comment Details */}
      <td className="px-2 sm:px-4 py-2 text-gray-800 break-words">
        <p className="mb-1 text-[10px] sm:text-xs">
          <span className="font-semibold text-gray-600">Blog:</span>{" "}
          <span className="font-medium text-gray-900">{blog?.title}</span>
        </p>
        <p className="mb-1 text-[10px] sm:text-xs">
          <span className="font-semibold text-gray-600">Name:</span>{" "}
          <span className="font-medium text-gray-900">{comment.name}</span>
        </p>
        <p className="text-[10px] sm:text-xs">
          <span className="font-semibold text-gray-600">Comment:</span>{" "}
          <span className="text-gray-800">{comment.content}</span>
        </p>
      </td>

      {/* Date */}
      <td className="px-2 sm:px-4 py-2 max-sm:hidden text-gray-500 text-[10px] sm:text-sm whitespace-nowrap">
        {BlogsDate.toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-2 sm:px-4 py-2">
        <div className="flex items-center gap-2 sm:gap-4 justify-center">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-4 h-4 sm:w-5 sm:h-6 cursor-pointer hover:scale-110 transition-transform"
            />
          ) : (
            <span className="text-[9px] sm:text-xs font-semibold border border-green-600 bg-green-100 text-green-600 rounded-full px-2 sm:px-3 py-1 shadow-sm">
              Approved
            </span>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-4 h-4 sm:w-5 sm:h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
