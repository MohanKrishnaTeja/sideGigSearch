import { useEffect, useState } from "react";
import { Contact, Mail, Pen, Phone, Briefcase } from "lucide-react";
import Navbar from "./shared/Navebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [profileData, setProfileData] = useState(null);
  const [skillsArray, setSkillsArray] = useState([]);

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `${token}`,
          },
        });

        setProfileData(response.data.user);
        setSkillsArray(response.data.user.skills.split(","));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleProfileUpdate = async (updatedProfile) => {
    setProfileData(updatedProfile);
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
                src="default-avatar.png"
                alt="Profile Picture"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-xl text-black">
                {profileData?.fullName || "Full Name"}
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
              {profileData?.email || "Email not provided"}
            </h1>
          </div>
          <div className="flex items-center gap-3 my-3">
            <Phone className="h-5 w-5 text-black" />
            <h1 className="text-black text-sm">
              {profileData?.phoneNumber || "Phone number not provided"}
            </h1>
          </div>
          <div className="flex items-center gap-3 my-3">
            <Briefcase className="h-5 w-5 text-black" />
            <h1 className="text-black text-sm">
              {profileData?.experience || "Experience not provided"}
            </h1>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h1 className="font-bold text-black text-lg mb-3">Skills</h1>
          <div className="flex items-center gap-2 flex-wrap">
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
        <h1 className="font-bold text-black text-lg mb-3">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      {/* Update Profile Dialog */}
      {open && (
        <UpdateProfileDialog open={open} setOpen={setOpen} onProfileUpdate={handleProfileUpdate} />
      )}
    </div>
  );
}