import React, { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
 
import FilterCard from "./FilterCard";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/jobs');
                const data = await response.json();
                setJobs(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-10">
            
            <div className="flex gap-6">
                <div className="w-1/6 bg-gray-100 p-4 rounded-lg shadow-lg">
                    <FilterCard />
                </div>

                <div className="flex-1 h-auto overflow-y-auto">
                    {loading ? (
                        <div className="text-center text-xl text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-xl text-red-500">{error}</div>
                    ) : jobs.length <= 0 ? (
                        <div className="text-center text-xl text-gray-600">No jobs found</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    jobId={job.id}
                                    title={job.title}
                                    description={job.description}
                                    companyLogo={job.componyLogo}
                                    companyName={job.createdBy.fullName}
                                    location={job.location}
                                    salary={job.salary}
                                    positions={job.positions}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
