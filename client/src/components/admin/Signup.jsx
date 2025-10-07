import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { axios, navigate } = useAppContext();
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
      <div className="w-full max-w-md p-8 bg-white border border-primary/20 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin")}
            className="text-yellow-600 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
