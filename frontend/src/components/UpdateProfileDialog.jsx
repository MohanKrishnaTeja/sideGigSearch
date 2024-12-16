import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [formData, setFormData] = useState({
    bio: "",
    phoneNumber: "",
    company: "",
    resume: null,
    profilePhoto: null,
    resumeOriginalName: "",
  });

  const [isProfileExisting, setIsProfileExisting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `${token}` },
        });

        if (response.data.profile) {
          setFormData({
            bio: response.data.profile.bio || "",
            phoneNumber: response.data.profile.phoneNumber || "",
            company: response.data.profile.company || "",
            resumeOriginalName: response.data.profile.resumeOriginalName || "",
            profilePhoto: response.data.profile.profilePhoto || "",
          });
          setIsProfileExisting(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (open) checkProfile();
  }, [open, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("bio", formData.bio);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("company", formData.company);
    form.append("resume", formData.resume);
    form.append("profilePhoto", formData.profilePhoto);

    try {
      const response = isProfileExisting
        ? await axios.put("http://localhost:5000/profile", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          })
        : await axios.post("http://localhost:5000/profile", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          });

      alert(response.data.msg);
      setOpen(false);
    } catch (error) {
      console.error("Error creating or updating profile:", error);
      alert(error.response?.data?.msg || "Error creating or updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogTitle>{isProfileExisting ? "Update Profile" : "Create Profile"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input id="profilePhoto" name="profilePhoto" type="file" onChange={handleFileChange} />
              {formData.profilePhoto && <p>File selected: {formData.profilePhoto.name}</p>}
            </div>
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" name="resume" type="file" onChange={handleFileChange} />
              {formData.resumeOriginalName && <p>Uploaded file: {formData.resumeOriginalName}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="ml-2" disabled={isLoading}>
              {isLoading ? "Submitting..." : isProfileExisting ? "Update Profile" : "Create Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
