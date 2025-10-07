import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/signup", formData);
      if (data.success) {
        toast.success("Admin registered successfully");
        navigate("/admin"); // Redirect to login
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-white px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 bg-white border border-primary/20 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Admin
            </span>{" "}
            Signup
          </h1>
          <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg">
            Create your admin account to access the panel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded-xl p-2 sm:p-3 text-sm sm:text-base md:text-base lg:text-lg outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition-all w-full"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="border border-gray-300 rounded-xl p-2 sm:p-3 text-sm sm:text-base md:text-base lg:text-lg outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition-all w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="border border-gray-300 rounded-xl p-2 sm:p-3 text-sm sm:text-base md:text-base lg:text-lg outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition-all w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 md:py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-base lg:text-lg"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
          <span className="px-2 text-gray-500 text-xs sm:text-sm">OR</span>
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
        </div>

        {/* Login Link */}
        <div className="mt-4 text-center text-gray-700 text-sm sm:text-base">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin")}
            className="text-yellow-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm md:text-sm lg:text-base text-gray-500">
          &copy; {new Date().getFullYear()} WordNest Admin Panel. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup;
