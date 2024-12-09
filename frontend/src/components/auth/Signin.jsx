import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux"; // Import useDispatch
import { setToken, setUser } from "../../redux/authSlice"; // Import Redux actions
import Navbar from "../shared/Navebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", formData);

      alert(res.data.msg); // Display the response message

      // Save token and user data in Redux store
      dispatch(setToken(res.data.token)); // Dispatch setToken action
      dispatch(setUser(res.data.user)); // Dispatch setUser action

      // Optionally store the token in localStorage for persistence
      localStorage.setItem("authToken", res.data.token);

      navigate("/"); // Navigate to the home page
    } catch (error) {
      alert(error.response?.data?.msg || "Signin failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="mohan@email.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Sign In
              </Button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
