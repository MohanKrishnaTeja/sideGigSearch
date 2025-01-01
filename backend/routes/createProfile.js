const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');

// Fetch User Details Route by User ID
router.get('/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        email: true,
        bio: true,
        phoneNumber: true,
        experience: true,
        skills: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
});

// Fetch Authenticated User Details Route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        email: true,
        bio: true,
        phoneNumber: true,
        experience: true,
        skills: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
});

// Create or Update User Profile Route
router.post('/profile', authenticateToken, async (req, res) => {
  const { bio, phoneNumber, experience, skills } = req.body;
  const userId = req.user.id;

  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        bio,
        phoneNumber,
        experience,
        skills,
      },
      create: {
        id: userId,
        bio,
        phoneNumber,
        experience,
        skills,
      },
    });

    res.status(200).json({ msg: 'Profile created/updated successfully', user });
  } catch (err) {
    console.error('Error creating/updating profile:', err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;