import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });

      if (data.success) {
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      {/* Background Gradient */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20"
      />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-800 px-4 sm:px-6 md:px-10 lg:px-20">
        <p className="text-yellow-600 font-semibold py-2 text-sm sm:text-base">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl mx-auto text-gray-900 leading-tight tracking-tight">
          {data.title}
        </h1>

        <h2 className="my-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          {data.subTitle}
        </h2>

        <div className="flex justify-center mt-4">
          <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full mb-6 border border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 text-sm font-medium shadow-sm">
            <img
              src={assets.user_icon}
              alt="author"
              className="w-6 h-6 rounded-full"
            />
            Vaibhav
          </span>
        </div>
      </div>

      {/* Blog Image + Content */}
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-auto max-w-6xl my-10">
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto rounded-xl shadow-md mb-6 object-cover hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Blog Content */}
        <article className="rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-6 prose prose-sm sm:prose-base md:prose-lg lg:prose-xl">
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </article>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto px-2 sm:px-0">
          <p className="font-semibold text-lg sm:text-xl mb-6 text-gray-900">
            Comments ({comments.length})
          </p>

          <div className="flex flex-col gap-6">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-yellow-100 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={assets.user_icon}
                    alt={item.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mt-2 ml-10 sm:ml-14">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto mt-12 px-2 sm:px-0">
          <p className="font-semibold text-lg sm:text-xl mb-4 text-gray-900">
            Add your comment
          </p>

          <form onSubmit={addComment} className="flex flex-col gap-4 max-w-lg">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 border border-yellow-200 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all bg-white text-sm sm:text-base"
            />

            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              className="w-full p-3 border border-yellow-200 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all h-32 sm:h-40 resize-none bg-white text-sm sm:text-base"
              required
            ></textarea>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-2.5 sm:p-3 sm:px-8 font-medium shadow-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                Submit
              </button>

              <p className="text-xs sm:text-sm text-gray-500">
                Be kind — your comment will be reviewed.
              </p>
            </div>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-16 sm:my-20 lg:my-24 max-w-3xl mx-auto text-center">
          <p className="font-semibold text-lg sm:text-xl mb-5 text-gray-900">
            Share this article
          </p>

          <div className="flex justify-center gap-3 sm:gap-5 flex-wrap">
            <button
              aria-label="Share on Facebook"
              className="p-2 sm:p-3 rounded-full bg-white shadow hover:shadow-lg transform hover:scale-105 transition"
            >
              <img
                src={assets.facebook_icon}
                width={36}
                className="sm:w-11 cursor-pointer"
                alt="Facebook"
              />
            </button>

            <button
              aria-label="Share on Twitter"
              className="p-2 sm:p-3 rounded-full bg-white shadow hover:shadow-lg transform hover:scale-105 transition"
            >
              <img
                src={assets.twitter_icon}
                width={36}
                className="sm:w-11 cursor-pointer"
                alt="Twitter"
              />
            </button>

            <button
              aria-label="Share on Google"
              className="p-2 sm:p-3 rounded-full bg-white shadow hover:shadow-lg transform hover:scale-105 transition"
            >
              <img
                src={assets.googleplus_icon}
                width={36}
                className="sm:w-11 cursor-pointer"
                alt="Google"
              />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
