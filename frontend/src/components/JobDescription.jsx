import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./shared/Navebar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobDescription() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`http://localhost:5000/jobs/${id}`, {
          headers: {
            Authorization: `${token}`, // Added Bearer prefix
          },
        });
        setJob(jobResponse.data);

        const appliedResponse = await axios.get(`http://localhost:5000/applied-jobs`, {
          headers: {
            Authorization: `${token}`, // Added Bearer prefix
          },
        });
        const appliedJobs = appliedResponse.data.appliedJobs;
        const isAlreadyApplied = appliedJobs.some((job) => job.jobId === parseInt(id));
        setIsApplied(isAlreadyApplied);
      } catch (err) {
        console.error("Error fetching job details or application status:", err.message);
      }
    };

    fetchJobDetails();
  }, [id, token]);

  const applyForJob = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/apply/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`, // Added Bearer prefix
          },
        }
      );

      if (response.status === 201) {
        setIsApplied(true);
        alert("Application submitted successfully!");
      } else {
        throw new Error(response.data?.msg || "Error applying for the job");
      }
    } catch (err) {
      console.error("Error applying for the job:", err.message);
      alert(err.response?.data?.msg || "Failed to apply for the job");
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white my-10 p-8 rounded-xl shadow-lg border border-gray-200">
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
            className={`py-3 px-8 ${
              isApplied
                ? "bg-gray-400 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            disabled={isApplied || loading}
            onClick={applyForJob}
          >
            {loading ? "Applying..." : isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div>
          <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">
            Job Description
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">
            Requirements
          </h2>
          <ul className="space-y-2 text-lg text-gray-600 list-disc list-inside">
            {job.requirements.split(',').map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl text-gray-700 border-b-2 pb-2 mb-4">
            Additional Info
          </h2>
          <p className="text-lg text-gray-600">
            Location: <span className="font-semibold">{job.location}</span>
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Posted by:{" "}
            <span className="font-semibold">{job.createdBy.fullName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}