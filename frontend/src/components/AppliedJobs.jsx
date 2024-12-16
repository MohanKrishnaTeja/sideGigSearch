import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow, TableHead } from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

export default function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]); // State for job data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors
    const token = useSelector((state) => state.auth.token);

    // Fetch applied jobs from the backend
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await fetch("http://localhost:5000/applied-jobs", {
                    headers: {
                        Authorization: `${token}`, // Send the JWT in the Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setAppliedJobs(data.appliedJobs); // Set the applied jobs in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [token]);

    // Handle loading state
    if (loading) {
        return <div className="text-center my-10">Loading applied jobs...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="text-center my-10 text-red-500">{error}</div>;
    }

    // Handle empty state
    if (appliedJobs.length === 0) {
        return <div className="text-center my-10">You have not applied to any jobs yet.</div>;
    }

    // Render the table with applied jobs
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-md shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-center">Applied Jobs</h1>
            <Table className="w-full border border-gray-300">
                <TableCaption className="text-sm text-gray-600 italic">A list of all jobs you have applied for</TableCaption>
                <TableHeader className="bg-gray-100 border-b border-gray-300">
                    <TableRow>
                        <TableHead className="font-semibold text-black">Date</TableHead>
                        <TableHead className="font-semibold text-black">Job Role</TableHead>
                        <TableHead className="font-semibold text-black">Location</TableHead>
                        <TableHead className="font-semibold text-black text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobs.map((application, index) => (
                        <TableRow key={index} className="hover:bg-gray-100 transition duration-150">
                            <TableCell className="text-black">
                                {new Date(application.appliedAt).toLocaleDateString()} {/* Format date */}
                            </TableCell>
                            <TableCell className="text-black">{application.job.title}</TableCell>
                            <TableCell className="text-black">{application.job.location}</TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    className={`px-3 py-1 ${
                                        application.status === "Selected"
                                            ? "bg-green-500 text-white"
                                            : application.status === "Rejected"
                                            ? "bg-red-500 text-white"
                                            : "bg-yellow-500 text-white"
                                    }`}
                                >
                                    {application.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
