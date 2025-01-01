import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
    bio: "",
    phoneNumber: "",
    experience: "",
    skills: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);

      // Alert the user with the response message
      alert(res.data.msg);

      // Dispatch actions to Redux to store token and user info
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));  // Store the full user object

      // Optionally store the token in localStorage for persistence
      localStorage.setItem("authToken", res.data.token);

      // Redirect to jobs page after successful sign-up
      navigate("/jobs");
    } catch (error) {
      alert(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Mohan"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
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
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
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
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Bio
            </Label>
            <Input
              type="text"
              name="bio"
              placeholder="I am a student in JNTU"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="918264723"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Experience
            </Label>
            <Input
              type="text"
              name="experience"
              placeholder="2"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Skills
            </Label>
            <Input
              type="text"
              name="skills"
              placeholder="work,timeManagement,etc"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent"
            />
          </div>
          <RadioGroup
            className="flex items-center space-x-4"
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <div className="flex items-center">
              <RadioGroupItem id="job-seeker" value="USER" />
              <Label htmlFor="job-seeker" className="ml-2">
                Job Seeker
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem id="recruiter" value="ADMIN" />
              <Label htmlFor="recruiter" className="ml-2">
                Recruiter
              </Label>
            </div>
          </RadioGroup>
          <Button
            type="submit"
            className="w-full py-2 px-4  text-white font-semibold rounded-md  focus:outline-none focus:ring-2 "
          >
            Signup
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}