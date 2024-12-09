import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import { useState } from "react";
import UpdatePrifileDailog from "./UpdateProfileDialog";

const skillsArray = ["Frontend", "Backend", "Fullstack"];

export default function Profile() {
    const [open,setOpen] = useState(false)
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl my-10 p-6 shadow-md">
                {/* Profile Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXp4jttQFB4CuLb_CRz4ZLBcw2gqcS5FmXg&s"
                                alt="Profile Picture"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl text-black">Mohan Krishna Teja</h1>
                            <p className="text-gray-600 text-sm mt-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nobis obcaecati
                                dolorem expedita corporis commodi quisquam eius, vel iste facilis iure earum provident
                                esse! A nesciunt repudiandae consequuntur maiores saepe.
                            </p>
                        </div>
                    </div>
                    <Button onClick ={() => setOpen(true)} variant="outline" className="text-black border-gray-300 hover:bg-gray-100">
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>

                {/* Contact Information */}
                <div className="my-6">
                    <div className="flex items-center gap-3 my-3">
                        <Mail className="h-5 w-5 text-black" />
                        <h1 className="text-black text-sm">mohan@gmail.com</h1>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact className="h-5 w-5 text-black" />
                        <h1 className="text-black text-sm">9182195134</h1>
                    </div>
                </div>

                {/* Skills Section */}
                <div>
                    <h1 className="font-bold text-black text-lg mb-3">Skills</h1>
                    <div className="flex items-center gap-2">
                        {skillsArray.length === 0 ? (
                            <span className="text-gray-500">N/A</span>
                        ) : (
                            skillsArray.map((item, index) => (
                                <Badge
                                    key={index}
                                    className="bg-black text-white px-3 py-1 font-medium text-sm rounded-md"
                                >
                                    {item}
                                </Badge>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-md p-6">
                <AppliedJobs />
            </div>
            <UpdatePrifileDailog open = {open} setOpen = {setOpen}/>
        </div>
    );
}
