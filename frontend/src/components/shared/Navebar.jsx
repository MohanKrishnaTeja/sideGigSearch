import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import { useState } from "react";

export default function Navbar() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user) || {}; // Provide a default value for user
    const navigate = useNavigate();
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");

    const handleLogout = () => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("authToken");
        navigate("/signin");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/jobs?title=${searchTitle}&location=${searchLocation}`);
    };

    return (
        <div className="bg-white shadow-lg border">
            <div className="flex items-center justify-between  h-16 px-6">
                {/* Logo and App Name */}
                <div>
                    <Link to="/jobs">
                        <h1 className="text-3xl font-semibold text-blue-800">Side Gig Search</h1>
                    </Link>
                </div>

                {/* Navbar Items */}
                <div className="flex items-center gap-6">
                    {token ? (
                        <>
                            {/* Admin Links */}
                            {user.role === "ADMIN" && (
                                <div className="flex items-center gap-4">
                                    <Link to="/admin/jobs">
                                        <Button variant="link" className="text-blue-800 hover:text-blue-600 transition-colors">
                                            Manage Jobs
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="link"
                                        className="font-semibold text-gray-700 hover:text-blue-600"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}

                            {/* User Links */}
                            {user.role === "USER" && (
                                <>
                                    <form onSubmit={handleSearch} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            placeholder="Job title"
                                            value={searchTitle}
                                            onChange={(e) => setSearchTitle(e.target.value)}
                                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Search
                                        </button>
                                    </form>

                                    {/* Profile Dropdown */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://shorturl.at/1fqcE" />
                                                <AvatarFallback>{user?.fullName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                                            <div className="flex justify-center font-bold mb-3 text-gray-800">
                                                {user?.fullName || "User"}
                                            </div>
                                            <div className="flex items-center gap-3 mb-3 text-gray-700">
                                                <User className="w-5 h-5 text-gray-600" />
                                                <Button variant="link" className="font-semibold text-gray-700 hover:text-blue-600">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <LogOut className="w-5 h-5 text-gray-600" />
                                                <Button
                                                    variant="link"
                                                    className="font-semibold text-gray-700 hover:text-blue-600"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/signin">
                                <Button variant="outline" className="text-blue-800 hover:bg-blue-50">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline" className="text-blue-800 hover:bg-blue-50">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
