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

                // Fetch user details for each application
                const userDetailsPromises = response.data.applications.map(async (application) => {
                    const userResponse = await axios.get(`http://localhost:5000/profile/${application.userId}`, {
                        headers: {
                            Authorization: `${token}`,
                        },
                    });
                    return { ...application, user: userResponse.data.user };
                });

                const applicationsWithUserDetails = await Promise.all(userDetailsPromises);
                setAppliedUsers(applicationsWithUserDetails); // Update state with applied users and their details
            } catch (err) {
                console.error("Error fetching job details:", err);
            }
        };

        if (id && token) {
            fetchJobDetails();
        }
    }, [id, token]);

    const handleAction = async (action, applicationId) => {
        try {
            const status = action === "accept" ? "ACCEPTED" : "REJECTED";
            const response = await axios.put(`http://localhost:5000/applications/${applicationId}/status`, { status }, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            // Update the application status in the state
            setAppliedUsers((prevUsers) =>
                prevUsers.map((application) =>
                    application.id === applicationId ? { ...application, status: response.data.application.status } : application
                )
            );

            alert(`Application status updated to ${status}`);
        } catch (err) {
            console.error(`Error updating application status to ${action}:`, err);
            alert(`Error updating application status: ${err.response?.data?.msg || err.message}`);
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
                                <th className="border border-gray-300 px-4 py-2">Bio</th>
                                <th className="border border-gray-300 px-4 py-2">Experience</th>
                                <th className="border border-gray-300 px-4 py-2">Skills</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedUsers.map((application) => (
                                <tr key={application.id}>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.fullName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.phoneNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.bio}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.experience}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.user.skills}</td>
                                    <td className="border border-gray-300 px-4 py-2">{application.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleAction("accept", application.id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction("reject", application.id)}
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