const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');
const upload = require('../middleware/multer')

// Create Profile Route
router.post(
  '/profile',
  authenticateToken,
  authorizeRoles('USER'),
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 }, // For profile photo
    { name: 'resume', maxCount: 1 },       // For resume
  ]),
  async (req, res) => {
    const { bio, phoneNumber, company } = req.body;

    try {
      const userId = req.user.id;

      const existingProfile = await prisma.profile.findUnique({
        where: { userId: userId },
      });

      if (existingProfile) {
        return res.status(400).json({ msg: 'Profile already exists, use PUT to update it' });
      }

      // If files are uploaded, extract paths
      const profilePhotoPath = req.files.profilePhoto
        ? req.files.profilePhoto[0].path
        : '';
      const resumePath = req.files.resume
        ? req.files.resume[0].path
        : '';
      const resumeOriginalName = req.files.resume
        ? req.files.resume[0].originalname
        : '';

      // Create a new profile
      const newProfile = await prisma.profile.create({
        data: {
          userId,
          bio,
          phoneNumber,
          company,
          profilePhoto: profilePhotoPath,
          resume: resumePath,
          resumeOriginalName,
        },
      });

      res.status(201).json({
        msg: 'Profile created successfully',
        profile: newProfile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error creating profile', error: err.message });
    }
  }
);

router.put(
  '/profile',
  authenticateToken,
  authorizeRoles('USER'),
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 }, // For profile photo
    { name: 'resume', maxCount: 1 },       // For resume
  ]),
  async (req, res) => {
    const { bio, phoneNumber, company } = req.body;

    try {
      const userId = req.user.id;

      const existingProfile = await prisma.profile.findUnique({
        where: { userId: userId },
      });

      if (!existingProfile) {
        return res.status(404).json({ msg: 'Profile not found. Use POST to create a profile.' });
      }

      // If files are uploaded, extract paths
      const profilePhotoPath = req.files.profilePhoto
        ? req.files.profilePhoto[0].path
        : existingProfile.profilePhoto;
      const resumePath = req.files.resume
        ? req.files.resume[0].path
        : existingProfile.resume;
      const resumeOriginalName = req.files.resume
        ? req.files.resume[0].originalname
        : existingProfile.resumeOriginalName;

      // Update the existing profile
      const updatedProfile = await prisma.profile.update({
        where: { userId: userId },
        data: {
          bio,
          phoneNumber,
          company,
          profilePhoto: profilePhotoPath,
          resume: resumePath,
          resumeOriginalName,
        },
      });

      res.status(200).json({
        msg: 'Profile updated successfully',
        profile: updatedProfile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error updating profile', error: err.message });
    }
  }
);



// Fetch Profile Details Route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Get the userId from the authenticated user
    const userId = req.user.id;

    // Fetch the profile details of the authenticated user
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    // If no profile is found, return a 404 error
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found.' });
    }

    res.status(200).json({
      msg: 'Profile fetched successfully',
      profile: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching profile details', error: err.message });
  }
});

module.exports = router;



