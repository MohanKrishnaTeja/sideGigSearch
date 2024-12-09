
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function JobCard({ jobId, title, description, companyLogo, companyName, location, salary, positions }) {
    const navigate = useNavigate();

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <p>2 days ago</p>
            <div className="flex items-center gap-2 my-5">
                <Button className="" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage
                            src={companyLogo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXp4jttQFB4CuLb_CRz4ZLBcw2gqcS5FmXg&s"} // fallback logo if no logo exists
                            alt="Company Logo"
                            className="object-cover"
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-bold capitalize">{title}</h1>
                    <p className="text-sm text-gray-600">{location}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg">{title}</h1>
                <p className="text-sm text-gray-600">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <Badge className="font-bold" variant="ghost">{positions} positions</Badge>
                <Badge className="font-bold" variant="ghost">{salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <Button onClick={() => navigate(`/jobdescription/${jobId}`)} variant="outline">Details</Button>
                <Button variant="default">Apply</Button>
            </div>
        </div>
    );
}

