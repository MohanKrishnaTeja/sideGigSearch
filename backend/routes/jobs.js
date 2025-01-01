const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// 1. Post a Job (Only Admin)
router.post('/jobs', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const { title, description, requirements, salary, location, noOfHours, positions, componyLogo } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary: parseFloat(salary),
        location,
        noOfHours: parseInt(noOfHours),
        positions: parseInt(positions),
        componyLogo: componyLogo || "", // Save the componyLogo value
        createdById: req.user.id,
        requirements, // Store requirements as a comma-separated string
      },
    });
    res.status(201).json({ msg: 'Job posted successfully', job });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ msg: 'Error posting job', error: err.message });
  }
});

// 2. Get All Jobs (Anyone can access)
router.get('/jobs', async (req, res) => {
  const { title, location } = req.query;

  try {
    // Fetch all jobs from the database without filtering
    const jobs = await prisma.job.findMany({
      include: {
        createdBy: {
          select: { fullName: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Filter jobs based on title and location query parameters
    const filteredJobs = jobs.filter((job) => {
      const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
      return matchesTitle && matchesLocation;
    });

    res.status(200).json(filteredJobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ msg: 'Error fetching jobs', error: err.message });
  }
});

// 3. Get Jobs Posted by Admin
router.get('/admin/jobs', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { createdById: req.user.id },
      orderBy: {
        createdAt: 'desc', // Order jobs by creation date
      },
    });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching admin jobs:", err);
    res.status(500).json({ msg: 'Error fetching admin jobs', error: err.message });
  }
});

// 4. Get Job by ID (Anyone can access)
router.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        createdBy: {
          select: { fullName: true }, // Include admin's full name who created the job
        },
        applications: {
          include: {
            user: { select: { fullName: true } }, // Include applicant's name
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job details:", err);
    res.status(500).json({ msg: 'Error fetching job details', error: err.message });
  }
});

router.put('/applications/:id/status', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json({ msg: 'Application status updated successfully', application });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ msg: 'Error updating application status', error: err.message });
  }
});

module.exports = router;
