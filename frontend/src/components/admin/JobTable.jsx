import React from "react";
import { Link } from "react-router-dom";

export default function JobTable() {
    // Placeholder data
    const jobs = [
        {
            id: 1,
            title: "Software Engineer",
            description: "Build and maintain applications.",
            location: "Remote",
            salary: "50,000",
            positions: 2,
        },
        {
            id: 2,
            title: "Frontend Developer",
            description: "Work on user interfaces.",
            location: "New York",
            salary: "60,000",
            positions: 1,
        },
    ];

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold">Posted Jobs</h2>
            <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Location</th>
                        <th className="border border-gray-300 px-4 py-2">Salary</th>
                        <th className="border border-gray-300 px-4 py-2">Positions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/adminjobdescription/${job.id}`} className="">
                                    {job.title}
                                </Link>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{job.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.location}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.salary}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.positions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


