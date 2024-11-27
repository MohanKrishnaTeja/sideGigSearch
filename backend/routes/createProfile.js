const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// Create Profile Route
router.post('/profile', authenticateToken, authorizeRoles('USER'), async (req, res) => {
  const { bio, phoneNumber, company, resume, profilePhoto, resumeOriginalName } = req.body;

  try {
    // Get the userId from the authenticated user
    const userId = req.user.id;

    // Check if a profile already exists for the user
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    if (existingProfile) {
      return res.status(400).json({ msg: 'Profile already exists.' });
    }

    // Create a new profile
    const newProfile = await prisma.profile.create({
      data: {
        userId,
        bio,
        phoneNumber,
        company,
        resume,
        profilePhoto: profilePhoto || '',
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
});

module.exports = router;
