import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import Navbar from "./shared/Navebar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobDescription() {
  const { id } = useParams(); // Extract jobId from the route params
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`); // Use the jobId in the API call
        if (!response.ok) throw new Error("Error fetching job details");
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchJob();
  }, [id]); // Trigger useEffect when jobId changes

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Navbar />
    <div className="max-w-7xl mx-auto bg-white my-10 p-8 rounded-xl shadow-lg border border-gray-200">
      {/* Job Title and Info Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex flex-col space-y-2 md:space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <div className="flex flex-wrap gap-3">
            <Badge className="font-semibold text-sm" variant="ghost">
              {job.positions} positions
            </Badge>
            <Badge className="font-semibold text-sm" variant="ghost">
              {job.noOfHours} Hours
            </Badge>
            <Badge className="font-semibold text-sm" variant="ghost">
              {job.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          className={`py-3 px-8 ${isApplied ? "bg-gray-400 text-white" : "bg-black text-white hover:bg-gray-800"}`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description */}
      <div>
        <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">Job Description</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{job.description}</p>
      </div>

      {/* Requirements Section */}
      <div className="mt-8">
        <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">Requirements</h2>
        <ul className="space-y-2 text-lg text-gray-600 list-disc list-inside">
          {job.requirements.map((req) => (
            <li key={req.id}>{req.name}</li>
          ))}
        </ul>
      </div>

      {/* Additional Info */}
      <div className="mt-8">
        <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">Additional Info</h2>
        <p className="text-lg text-gray-600">Location: <span className="font-semibold">{job.location}</span></p>
        <p className="text-lg text-gray-600 mt-2">Posted by: <span className="font-semibold">{job.createdBy.fullName}</span></p>
      </div>
    </div>
  </div>
  );
}
