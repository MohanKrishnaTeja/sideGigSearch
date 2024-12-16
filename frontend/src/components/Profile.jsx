import { useEffect, useState } from "react";
import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import { useSelector } from "react-redux";
import UpdatePrifileDailog from "./UpdateProfileDialog";
import axios from "axios"; // For making API calls

export default function Profile() {
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const email = useSelector((state) => state.auth.User.email); 
    const fullName = useSelector((state) => state.auth.fullName); 
    const [profileData, setProfileData] = useState(null); // To store profile details
    const [skillsArray, setSkillsArray] = useState([]); // To store skills

    // Fetch profile data from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `${token}`, // Include token if required
                    },
                });
                
                setProfileData(response.data.profile);
                setSkillsArray(response.data.profile.skills || []); // Update skills if available
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl my-10 p-6 shadow-md">
                {/* Profile Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src={profileData?.profilePhoto || "data:image/png;base64,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"}
                                alt="Profile Picture"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl text-black">
                                {profileData?.name || fullName}
                            </h1>
                            <p className="text-gray-600 text-sm mt-2">
                                {profileData?.bio || "No bio available"}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outline"
                        className="text-black border-gray-300 hover:bg-gray-100"
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>

                {/* Contact Information */}
                <div className="my-6">
                    <div className="flex items-center gap-3 my-3">
                        <Mail className="h-5 w-5 text-black" />
                        <h1 className="text-black text-sm">
                            {console.log("redux email",email)}
                            {profileData?.email || email }
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact className="h-5 w-5 text-black" />
                        <h1 className="text-black text-sm">
                            {profileData?.phoneNumber || "Not provided"}
                        </h1>
                    </div>
                </div>

                {/* Skills Section */}
                <div>
                    <h1 className="font-bold text-black text-lg mb-3">Skills</h1>
                    <div className="flex items-center gap-2">
                        {skillsArray.length === 0 ? (
                            <span className="text-gray-500">N/A</span>
                        ) : (
                            skillsArray.map((item, index) => (
                                <Badge
                                    key={index}
                                    className="bg-black text-white px-3 py-1 font-medium text-sm rounded-md"
                                >
                                    {item}
                                </Badge>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-md p-6">
                <AppliedJobs />
            </div>
            <UpdatePrifileDailog open={open} setOpen={setOpen} />
        </div>
    );
}
