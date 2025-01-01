import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from 'date-fns';

export default function JobCard({
  jobId,
  title,
  description = "No description available", // Default description if not provided
  companyLogo,
  companyName,
  location,
  salary,
  positions,
  createdAt
}) {
  const navigate = useNavigate();

  // Ensure that createdAt is valid before using it
  const daysAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Unknown time";

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <p className="text-sm text-gray-500">{daysAgo}</p>
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={companyLogo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXp4jttQFB4CuLb_CRz4ZLBcw2gqcS5FmXg&s"} // fallback logo if no logo exists
            alt="Company Logo"
            className="object-cover rounded-full"
          />
        </Avatar>
        <div>
          <h1 className="text-xl font-bold capitalize">{title}</h1>
          <p className="text-sm text-gray-600">{companyName}</p>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Badge className="font-bold" variant="ghost">{positions} positions</Badge>
        <Badge className="font-bold" variant="ghost">{salary} LPA</Badge>
      </div>

      <div className="mt-6">
        <Button onClick={() => navigate(`/jobdescription/${jobId}`)} variant="outline" className="w-full py-2 text-center">
          Details
        </Button>
      </div>
    </div>
  );
}
