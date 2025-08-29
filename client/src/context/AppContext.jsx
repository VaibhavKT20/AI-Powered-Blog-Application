import { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();

  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([ ])
  const [input, setInput] = useState('')

  const fetchBlogs = async () => {
  try {
    const { data } = await axios.get('api/blog/all');
    console.log("Fetched blog data:", data);
    data.success ? setBlogs(data.blogs) : toast.error(data.message);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    toast.error(error.response?.data?.message || error.message || 'Something went wrong');
  }
}

useEffect(() => {
  console.log("useEffect: fetching blogs...");
  fetchBlogs();
  const token = localStorage.getItem('token');
  if (token) {
    console.log("Token found in localStorage:", token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `${token}`;
  }
}, []);


  const value = {
    axios, navigate, token, setToken, blogs, setBlogs, input, setInput
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
};