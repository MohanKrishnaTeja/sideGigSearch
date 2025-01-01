import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useSelector } from "react-redux";

const PostJobModal = ({ isOpen, onClose, onJobPosted }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [noOfHours, setNoOfHours] = useState("");
    const [positions, setPositions] = useState("");
    const [componyLogo, setComponyLogo] = useState("");
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async () => {
        const jobData = {
            title,
            description,
            requirements, // Store requirements as a comma-separated string
            salary: parseFloat(salary),
            location,
            noOfHours: parseInt(noOfHours),
            positions: parseInt(positions),
            componyLogo,
        };

        try {
            const response = await axios.post("http://localhost:5000/jobs", jobData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(`Job submitted successfully: ${response.data.job.title}`);
            // Clear the form after submission
            setTitle("");
            setDescription("");
            setRequirements("");
            setSalary("");
            setLocation("");
            setNoOfHours("");
            setPositions("");
            setComponyLogo("");
            onClose();
            onJobPosted(); // Notify parent component to refresh the jobs table
        } catch (err) {
            alert(`Error posting job: ${err.response?.data?.msg || err.message}`);
            console.error("Error posting job:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Post a New Job</DialogTitle>
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        placeholder="Requirements (comma-separated)"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                    />
                    <Input
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Input
                        placeholder="Number of Hours"
                        value={noOfHours}
                        onChange={(e) => setNoOfHours(e.target.value)}
                    />
                    <Input
                        placeholder="Number of Positions"
                        value={positions}
                        onChange={(e) => setPositions(e.target.value)}
                    />
                    <Input
                        placeholder="Company Logo URL"
                        value={componyLogo}
                        onChange={(e) => setComponyLogo(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="default" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PostJobModal;