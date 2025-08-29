import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
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
    try {
      e.preventDefault();
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
        quillref.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.messahe);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    //Initiate Quill only once
    if (!quillref.current && editorRef.current) {
      quillref.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 text-gray-700 h-full overflow-auto p-6 sm:p-10"
    >
      <div className="bg-white w-full max-w-3xl p-8 sm:p-12 mx-auto shadow-2xl rounded-2xl border border-yellow-200/70">
        {/* Upload Thumbnail */}
        <p className="font-semibold text-gray-700 tracking-wide">
          Upload Thumbnail
        </p>
        <label htmlFor="image" className="block mt-3 cursor-pointer group">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="h-24 w-full object-cover rounded-xl border-2 border-dashed border-yellow-300 group-hover:border-yellow-500 transition-all shadow-sm"
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
        <p className="mt-8 font-semibold text-gray-700 tracking-wide">
          Blog Title
        </p>
        <input
          type="text"
          placeholder="Enter a catchy title..."
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-6 font-semibold text-gray-700 tracking-wide">
          Sub Title
        </p>
        <input
          type="text"
          placeholder="Add a subtitle"
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Blog Description */}
        <p className="mt-6 font-semibold text-gray-700 tracking-wide">
          Blog Description
        </p>
        <div className="max-w-full h-80 pb-14 sm:pb-12 pt-2 relative border border-gray-300 rounded-xl shadow-inner bg-yellow-50/30">
          <div ref={editorRef} className="h-full overflow-auto px-2"></div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
              <div className="w-12 h-12 border-4 border-yellow-400 border-t-yellow-600 rounded-full animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-3 right-3 text-xs text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 px-4 py-1.5 rounded-lg transition-all cursor-pointer shadow-md"
          >
            Generate with AI
          </button>
        </div>

        {/* Blog Category */}
        <p className="mt-6 font-semibold text-gray-700 tracking-wide">
          Blog Category
        </p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 mt-6">
          <p className="font-semibold text-gray-700 tracking-wide">
            Publish Now
          </p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer accent-yellow-500"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-10 w-full sm:w-44 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl cursor-pointer hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
