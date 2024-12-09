
import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";

const skillsArray = ["frontend", 'backend', 'fullstack']

export default function Profile() {

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl my-5 p-6">
                <div className="flex justify-between">
                    <div className="flex items-center ">
                        <Avatar>
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXp4jttQFB4CuLb_CRz4ZLBcw2gqcS5FmXg&s"></AvatarImage>
                        </Avatar>
                        <div className="mx-4">
                            <h1 className="font-bold">name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nobis obcaecati dolorem expedita corporis commodi quisquam eius, vel iste facilis iure earum provident esse! A nesciunt repudiandae consequuntur maiores saepe.</p>
                        </div>

                    </div>
                    <Button varient="outline" className="my-5"><Pen /></Button>
                </div>
                <div>
                    <div className="flex items-center gap-3 my-3">
                        <Mail />
                        <h1>mohan@gmail.com</h1>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact />
                        <h1>9182195134</h1>
                    </div>
                </div>
                <div>
                    <h1>skills</h1>
                    <div className="flex items-center gap-2">
                        {
                            skillsArray.length == 0 ? <span>N/A</span> : skillsArray.map((item, index) => <Badge key={index}>{item}</Badge>)

                        }
                    </div>

                </div>

                
            </div>
            <div className="max-w-4xl  mx-auto  bg-white rounded-2xl ">
                    <h1 className="font-bold mx-2">Applied Jobs</h1>
                    <AppliedJobs/>
                </div>
        </div>
    )
}