const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// 1. Post a Job (Only Admin)
router.post('/jobs', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const { title, description, requirements, salary, location, noOfHours, positions, componyLogo } = req.body;

  
  const logo = componyLogo || ""; 

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        noOfHours,
        positions,
        componyLogo: logo, // Save the componyLogo value
        createdById: req.user.id,
        requirements: {
          connect: requirements.map(skillId => ({ id: skillId })),
        },
      },
    });
    res.status(201).json({ msg: 'Job posted successfully', job });
  } catch (err) {
    res.status(500).json({ msg: 'Error posting job', error: err.message });
  }
});


// 2. Get All Jobs (Anyone can access)
router.get('/jobs', async (req, res) => {
  const { location, minSalary, maxSalary, jobType } = req.query;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        location: location || undefined,
        salary: {
          gte: minSalary ? parseInt(minSalary) : undefined,
          lte: maxSalary ? parseInt(maxSalary) : undefined,
        },
        jobType: jobType || undefined,
      },
      include: {
        requirements: true,
        createdBy: {
          select: { fullName: true },
        },
      },
    });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching jobs', error: err.message });
  }
});

// 3. Get Jobs Posted by Admin
router.get('/admin/jobs', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { createdById: req.user.id },
      include: { requirements: true },
    });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching admin jobs', error: err.message });
  }
});

module.exports = router;
