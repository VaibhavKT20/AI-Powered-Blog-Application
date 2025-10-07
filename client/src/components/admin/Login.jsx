import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e, demo = false) => {
    e?.preventDefault();

    const loginEmail = demo ? "admin@example.com" : email;
    const loginPassword = demo ? "admin123" : password;

    try {
      const { data } = await axios.post("/api/admin/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Login successful!");
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
            Login
          </h1>
          <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg">
            Enter your credentials to access the admin panel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              required
              placeholder="you@example.com"
              className="border border-gray-300 rounded-xl p-2 sm:p-3 text-sm sm:text-base md:text-base lg:text-lg outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition-all w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              required
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl p-2 sm:p-3 text-sm sm:text-base md:text-base lg:text-lg outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition-all w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 md:py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-base lg:text-lg"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
          <span className="px-2 text-gray-500 text-xs sm:text-sm">OR</span>
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={(e) => handleSubmit(e, true)}
          className="w-full py-2.5 sm:py-3 md:py-3 lg:py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-base lg:text-lg"
        >
          Login with Demo Credentials
        </button>

        {/* Signup Link */}
        <div className="mt-4 text-center text-gray-700 text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/admin/signup")}
            className="text-yellow-600 font-semibold cursor-pointer hover:underline"
          >
            Signup
          </span>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-4 sm:mt-6 bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-xs sm:text-sm md:text-sm lg:text-base text-gray-700">
          <p className="font-semibold text-gray-800 mb-1 text-sm sm:text-base md:text-base lg:text-lg">
            Demo Credentials:
          </p>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base">
            <span className="font-medium">Email:</span> admin@example.com
          </p>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base">
            <span className="font-medium">Password:</span> admin123
          </p>
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

export default Login;
