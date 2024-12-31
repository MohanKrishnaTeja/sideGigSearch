import { useEffect, useState } from "react";
import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import { useSelector } from "react-redux";
import axios from "axios"; // For making API calls

export default function Profile() {
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const email = useSelector((state) => state.auth.User.email);
    const fullName = useSelector((state) => state.auth.User.fullName);
    const [profileData, setProfileData] = useState(null); // To store profile details
    const [skillsArray, setSkillsArray] = useState([]); // To store skills

    // Fetch profile data from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token if required
                    },
                });

                setProfileData(response.data.profile);
                setSkillsArray(response.data.profile.skills || []); // Update skills if available
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, [token]);

    const handleProfileUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.put("http://localhost:5000/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProfileData(response.data.profile);
            setOpen(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl my-10 p-6 shadow-md">
                {/* Profile Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src={profileData?.profilePhoto ? `http://localhost:5000/uploads/${profileData.profilePhoto}` : "default-avatar.png"}
                                alt="Profile Picture"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl text-black">
                                {fullName}
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
                            {profileData?.email || email}
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

            {/* Update Profile Dialog */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
                    <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Bio</label>
                                <textarea
                                    name="bio"
                                    defaultValue={profileData?.bio}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    defaultValue={profileData?.phoneNumber}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    defaultValue={profileData?.company}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Profile Photo</label>
                                <input
                                    type="file"
                                    name="profilePhoto"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Resume</label>
                                <input
                                    type="file"
                                    name="resume"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="button" onClick={handleClose} className="mr-2">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-blue-500 text-white">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}