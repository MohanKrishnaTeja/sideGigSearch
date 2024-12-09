import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.User);

    const handleLogout = () => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("authToken");
    };

    return (
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Side Gig Search</h1>
                </div>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-6 text-gray-700">
                        {user && user.role === "ADMIN" ? (
                            <Link to="/admin/jobs">
                                <li className="hover:text-indigo-600 transition-colors">Manage Jobs</li>
                            </Link>
                        ) : (
                            <>
                                <Link to="/">
                                    <li className="hover:text-indigo-600 transition-colors">Home</li>
                                </Link>
                                <Link to="/jobs">
                                    <li className="hover:text-indigo-600 transition-colors">Jobs</li>
                                </Link>
                                <li className="hover:text-indigo-600 transition-colors">Browse</li>
                            </>
                        )}
                    </ul>
                    {!token ? (
                        <div className="flex gap-3">
                            <Link to="/signin">
                                <Button variant="outline" className="text-gray-800 hover:bg-indigo-50">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline" className="text-gray-800 hover:bg-indigo-50">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                                <div className="flex justify-center font-bold mb-3 text-gray-800">
                                    {user?.fullName || "User"}
                                </div>
                                {user?.role === "USER" && (
                                    <div className="flex items-center gap-3 mb-3 text-gray-700">
                                        <User className="w-5 h-5 text-gray-600" />
                                        <Button variant="link" className="font-semibold text-gray-700 hover:text-indigo-600">
                                            <Link to="/profile">View Profile</Link>
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-gray-700">
                                    <LogOut className="w-5 h-5 text-gray-600" />
                                    <Button
                                        variant="link"
                                        className="font-semibold text-gray-700 hover:text-indigo-600"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}
