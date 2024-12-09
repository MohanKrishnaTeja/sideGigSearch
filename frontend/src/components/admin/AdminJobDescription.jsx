import { useState } from "react";
import Navbar from "../shared/Navebar";


export default function AdminJobDescription() {
    // Placeholder data for job description
    const job = {
        title: "Software Engineer",
        description: "Build and maintain scalable applications.",
        location: "Remote",
        salary: "50,000",
        positions: 2,
        requirements: "JavaScript, React, Node.js",
    };

    // Placeholder data for applied users
    const appliedUsers = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            resume: "/path/to/resume1.pdf",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            resume: "/path/to/resume2.pdf",
        },
    ];

    const handleAction = (action, userId) => {
        if (action === "accept") {
            // Logic to accept the user (e.g., update their application status)
            alert(`User with ID ${userId} accepted.`);
        } else if (action === "reject") {
            // Logic to reject the user (e.g., update their application status)
            alert(`User with ID ${userId} rejected.`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
                {/* Job Description Section */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">{job.title}</h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                    <p className="text-gray-600 mt-2"><strong>Location:</strong> {job.location}</p>
                    <p className="text-gray-600 mt-2"><strong>Salary:</strong> {job.salary}</p>
                    <p className="text-gray-600 mt-2"><strong>Positions Available:</strong> {job.positions}</p>
                    <p className="text-gray-600 mt-2"><strong>Requirements:</strong> {job.requirements}</p>
                </div>

                {/* Applied Users Table */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applied Users</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Resume</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View Resume
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleAction("accept", user.id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction("reject", user.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
