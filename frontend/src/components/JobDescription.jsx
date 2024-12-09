import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobDescription() {
    const isApplied = false;

    return (
        <div className="max-w-7xl mx-auto bg-white my-10 p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-bold text-2xl text-gray-800">Job Title</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <Badge className="font-bold" variant="ghost">10 positions</Badge>
                        <Badge className="font-bold" variant="ghost">Part Time</Badge>
                        <Badge className="font-bold" variant="ghost">10 LPA</Badge>
                    </div>
                </div>
                <Button
                    className={`py-2 px-6 ${isApplied ? "bg-gray-400 text-white" : "bg-black text-white"} `}
                    disabled={isApplied}
                >
                    {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <h1 className="font-bold text-lg text-gray-700 border-b border-gray-300 pb-2">Job Description</h1>
            <div className="my-6 space-y-4 text-gray-600">
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Role:</h1>
                    <p className="ml-2">Frontend Developer</p>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Location:</h1>
                    <p className="ml-2">Hyderabad, India</p>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Experience Required:</h1>
                    <p className="ml-2">2-5 years</p>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Salary:</h1>
                    <p className="ml-2">10-15 LPA</p>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Applicants:</h1>
                    <p className="ml-2">25 applicants so far</p>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold text-gray-700">Posted:</h1>
                    <p className="ml-2">2 days ago</p>
                </div>
            </div>

            <h1 className="font-bold text-lg text-gray-700 border-b border-gray-300 pb-2">About the Job</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
                We are looking for a talented Frontend Developer to join our team. You will work on cutting-edge web
                technologies and contribute to building user-friendly applications. The ideal candidate should be 
                proficient in React.js and have a good understanding of modern development workflows.
            </p>
        </div>
    );
}
