import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navebar";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminJobDescription() {
    const { id } = useParams(); // Get job ID from URL
    const [job, setJob] = useState(null); // State to store job details
    const [appliedUsers, setAppliedUsers] = useState([]); // State to store applied users
    const token = useSelector((state) => state.auth.token); // Fetch token from Redux state

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/jobs/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setJob(response.data); // Update state with job details
                setAppliedUsers(response.data.applications || []); // Update state with applied users
            } catch (err) {
                console.error("Error fetching job details:", err);
            }
        };

        if (id && token) {
            fetchJobDetails();
        }
    }, [id, token]);

    const handleAction = (action, userId) => {
        if (action === "accept") {
            // Logic to accept the user (e.g., update their application status)
            alert(`User with ID ${userId} accepted.`);
        } else if (action === "reject") {
            // Logic to reject the user (e.g., update their application status)
            alert(`User with ID ${userId} rejected.`);
        }
    };

    if (!job) {
        return <div>Loading...</div>; // Show loading state
    }

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
                    <p className="text-gray-600 mt-2"><strong>Requirements:</strong> {job.requirements.map(req => req.name).join(', ')}</p>
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
                            {appliedUsers.map((application) => (
                                <tr key={application.id}>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.fullName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.phoneNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a href={`http://localhost:5000/uploads/${application.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View Resume
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleAction("accept", application.user.id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction("reject", application.user.id)}
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