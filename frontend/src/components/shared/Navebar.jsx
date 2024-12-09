import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
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
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">Side Gig Search</h1>
                </div>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === "ADMIN" ? (
                            <>
                                <Link to="/admin/jobs">Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/"><li>Home</li></Link>
                                <Link to="/jobs"><li>Jobs</li></Link>
                                <li>Browse</li>
                            </>
                        )}
                    </ul>
                    {!token ? (
                        <div className="flex gap-1">
                            <Link to="/signin"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button variant="outline">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex justify-center font-bold mb-2">
                                    {user?.name || "User"}
                                </div>
                                {user?.role === "STUDENT" && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <User2 />
                                        <Button variant="link" className="font-bold">
                                            <Link to="/profile">View Profile</Link>
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <LogOut />
                                    <Button
                                        variant="link"
                                        className="font-bold"
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
