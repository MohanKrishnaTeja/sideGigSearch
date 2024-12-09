import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export default function JobCard() {
    const navigate = useNavigate()
    const jobId = "1"
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <p>2 days ago</p>
            <div className="flex items-center gap-2 my-5">
                <Button className="" variant="outline" size="icon">
                    <Avatar className="">
                        <AvatarImage
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXp4jttQFB4CuLb_CRz4ZLBcw2gqcS5FmXg&s"
                            alt="Company Logo"
                            className="object-cover"
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-bold">Company Name</h1>
                    <p className="text-sm text-gray-600">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg">Job Title</h1>
                <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, dolor qui corporis repellendus excepturi sit cum ipsam vitae facere.
                </p>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <Badge className="font-bold" variant="ghost">10 positions</Badge>
                <Badge className="font-bold" variant="ghost">Part Time</Badge>
                <Badge className="font-bold" variant="ghost">10 LPA</Badge>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <Button onClick = {()=> navigate( `/jobdescription/${jobId}`)} variant="outline">Details</Button>
                <Button variant="default">Apply</Button>
            </div>
        </div>
    );
}
