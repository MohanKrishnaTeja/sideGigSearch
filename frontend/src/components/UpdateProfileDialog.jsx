import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
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

    const form = new FormData();
    form.append("bio", formData.bio);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("company", formData.company);
    form.append("resume", formData.resume);
    form.append("profilePhoto", formData.profilePhoto);
    form.append("resumeOriginalName", formData.resume?.name || "");

    try {
      const response = await axios.post("/api/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.msg);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error updating profile");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside = {()=> setOpen(false)}>
        <DialogTitle>Update Profile</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              Update Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
