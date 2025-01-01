import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./shared/Navebar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const CreateProfile = () => {
    const [bio, setBio] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [company, setCompany] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [resume, setResume] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('You must be logged in to access this page.');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) return;

        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('phoneNumber', phoneNumber);
        formData.append('company', company);
        if (profilePhoto) {
            if (!profilePhoto.type.startsWith('image/')) {
                alert('Profile photo must be an image file.');
                return;
            }
            formData.append('profilePhoto', profilePhoto);
        }
        if (resume) {
            if (resume.type !== 'application/pdf') {
                alert('Resume must be a PDF file.');
                return;
            }
            formData.append('resume', resume);
        }

        try {
            const response = await axios.post('http://localhost:5000/profile', formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Profile created successfully');
            navigate('/');
        } catch (err) {
            alert(`Error creating profile: ${err.response?.data?.message || 'Something went wrong.'}`);
            console.error('Error creating profile:', err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl my-10 p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label>
                        Bio
                        <Textarea
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>
                    <label>
                        Phone Number
                        <Input
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        Company
                        <Input
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </label>
                    <label>
                        Profile Photo
                        <Input
                            type="file"
                            onChange={(e) => setProfilePhoto(e.target.files?.[0])}
                        />
                    </label>
                    <label>
                        Resume
                        <Input
                            type="file"
                            onChange={(e) => setResume(e.target.files?.[0])}
                        />
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
