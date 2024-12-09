import React, { useState } from "react";
import PostJobModal from "./PostJobModal";
import JobTable from "./JobTable";
import { Button } from "../ui/button";
import Navbar from "../shared/Navebar";

export default function AdminHome() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto  p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button onClick={() => setModalOpen(true)}>Post a Job</Button>
            </div>

            {/* Job Posting Modal */}
            <PostJobModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            {/* Table of Posted Jobs */}
            <JobTable />
        </div>
        </div>
        
    );
}

