import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { parse } from "marked";
import { Sparkles } from "lucide-react";

const AddBlog = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillref = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const response = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      const data = response.data;
      if (data.success) {
        quillref.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillref.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillref.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);

        // Redirect to home page after short delay
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillref.current && editorRef.current) {
      quillref.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 text-gray-700 min-h-screen overflow-auto p-4 sm:p-6 md:p-8 lg:p-10"
    >
      <div className="bg-white w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-4 sm:p-6 md:p-8 lg:p-10 mx-auto shadow-2xl rounded-2xl border border-yellow-200/70 flex flex-col gap-6 sm:gap-8 pb-20">
        {/* Upload Thumbnail */}
        <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base">
          Upload Thumbnail
        </p>
        <label htmlFor="image" className="block cursor-pointer group w-full">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover rounded-xl border-2 border-dashed border-yellow-300 group-hover:border-yellow-500 transition-all shadow-sm"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Blog Title */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base">
            Blog Title
          </p>
          <input
            type="text"
            placeholder="Enter a catchy title..."
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm text-sm sm:text-base w-full"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Sub Title */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base">
            Sub Title
          </p>
          <input
            type="text"
            placeholder="Add a subtitle"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm text-sm sm:text-base w-full"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>

        {/* Blog Description */}
        <div className="flex flex-col relative">
          <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base">
            Blog Description
          </p>
          <div className="max-w-full h-64 sm:h-72 md:h-80 lg:h-96 pt-2 pb-12 relative border border-gray-300 rounded-xl shadow-inner bg-yellow-50/30 overflow-auto">
            <div
              ref={editorRef}
              className="h-full px-2 sm:px-3 text-sm sm:text-base"
            ></div>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-yellow-400 border-t-yellow-600 rounded-full animate-spin"></div>
              </div>
            )}

            <button
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="absolute bottom-3 right-3 flex items-center gap-1 sm:gap-2 
             text-[10px] sm:text-xs text-white 
             bg-gradient-to-r from-yellow-500 to-yellow-600 
             hover:from-yellow-600 hover:to-yellow-700 
             px-3 sm:px-4 py-1 sm:py-1.5 
             rounded-lg transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              Generate with AI
            </button>
          </div>
        </div>

        {/* Blog Category */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base cursor-pointer">
            Blog Category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="mt-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm text-sm sm:text-base w-full cursor-pointer"
          >
            <option value="" className="cursor-pointer">
              Select Category
            </option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item} className="cursor-pointer">
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 mt-2 sm:mt-4">
          <p className="font-semibold text-gray-700 tracking-wide text-sm sm:text-base">
            Publish Now
          </p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-110 sm:scale-125 cursor-pointer accent-yellow-500"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-4 sm:mt-6 w-full sm:w-48 h-10 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl cursor-pointer hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg text-sm sm:text-base"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
