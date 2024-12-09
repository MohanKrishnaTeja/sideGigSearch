import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const PostJobModal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [positions, setPositions] = useState("");

    const handleSubmit = () => {
        // Dummy backend handling
        console.log("Job submitted:", {
            title,
            description,
            requirements,
            salary,
            location,
            positions,
        });
        // Clear the form after submission
        setTitle("");
        setDescription("");
        setRequirements("");
        setSalary("");
        setLocation("");
        setPositions("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Post a Job</Button>
            </DialogTrigger>
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
                        placeholder="Number of Positions"
                        value={positions}
                        onChange={(e) => setPositions(e.target.value)}
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
