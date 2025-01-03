import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function JobTable({ refresh }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/jobs", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setJobs(response.data || []);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError(err.response?.data?.message || "Failed to fetch jobs.");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchJobs();
        } else {
            setError("User is not authenticated. Please log in.");
            setLoading(false);
        }
    }, [token, refresh]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold">Posted Jobs</h2>
            <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th scope="col" className="border border-gray-300 px-4 py-2">Title</th>
                        <th scope="col" className="border border-gray-300 px-4 py-2">Description</th>
                        <th scope="col" className="border border-gray-300 px-4 py-2">Location</th>
                        <th scope="col" className="border border-gray-300 px-4 py-2">Salary</th>
                        <th scope="col" className="border border-gray-300 px-4 py-2">Positions</th>
                        <th scope="col" className="border border-gray-300 px-4 py-2">Requirements</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to={`/adminjobdescription/${job.id}`}>
                                        {job.title}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{job.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.salary}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.positions}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {job.requirements ? (
                                        <ul>
                                            {job.requirements.split(',').map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No requirements"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                                No jobs available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}