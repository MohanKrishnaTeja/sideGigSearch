import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function Navbar() {
    const user = false
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">side Gig Search</h1>
                </div>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-5 ">
                        <Link to= "/"><li>Home</li></Link>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex gap-1">
                                <Link to = "/signin"><Button variant = "outline">login</Button></Link>
                                <Link to = "/signup"><Button variant = "outline">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                        <PopoverTrigger asChild>
                            <Avatar >
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex justify-center font-bold">
                                mohan
                            </div>
                            <div className="flex items-center">
                                <User2/>
                                <Button variant="link" className = "font-bold ">view profile</Button>
                            </div>
                            <div className="flex items-center"> 
                                <LogOut/>
                                 <Button variant="link" className = "font-bold ">logout</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                        )
                    }
                    
                </div>
            </div>

        </div>
    )
}