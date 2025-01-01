import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { useLocation } from "react-router-dom";
import Navbar from "./shared/Navebar"; // Fixed typo: "Navebar" to "Navbar"

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();

  const fetchJobs = async (title = "", location = "") => {
    try {
      const res = await axios.get("http://localhost:5000/jobs", {
        params: { title, location },
      });
      setJobs(res.data); // Ensure res.data is an array
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title") || "";
    const locationParam = params.get("location") || "";
    fetchJobs(title, locationParam);
  }, [location]);

  if (!Array.isArray(jobs)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-600">
          Error: Jobs data is not an array
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Listings
        </h1>
        {jobs.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-600">No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                jobId={job.id}
                title={job.title}
                description={job.description}
                companyLogo={job.companyLogo}
                companyName={job.createdBy.fullName}
                location={job.location}
                salary={job.salary}
                positions={job.positions}
                createdAt={job.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
