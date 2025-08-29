import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-white px-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-white border border-primary/20 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Admin
            </span>{" "}
            Login
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Enter your credentials to access the admin panel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-semibold text-gray-800 mb-1">Demo Credentials:</p>
          <p>
            <span className="font-medium">Email:</span> admin@example.com
          </p>
          <p>
            <span className="font-medium">Password:</span> admin123
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} WordNest Admin Panel. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
