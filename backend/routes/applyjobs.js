const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Apply for a job route
router.post('/apply/:jobId', authenticateToken, async (req, res) => {
  const jobId = parseInt(req.params.jobId);
  const userId = req.user.id; // From the authenticate middleware

  try {
    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the user has already applied for the job
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        userId: userId,
      },
    });

    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    // Create an application
    const application = await prisma.application.create({
      data: {
        userId: userId,
        jobId: jobId,
        status: 'APPLIED', // Set default status as 'APPLIED'
      },
    });

    res.status(201).json({ msg: 'Job application submitted successfully', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error applying for job', error: err.message });
  }
});

// Get applied jobs route
router.get('/applied-jobs', authenticateToken, async (req, res) => {
  const userId = req.user.id; // From the authenticate middleware

  try {
    // Get all applications of the user
    const applications = await prisma.application.findMany({
      where: { userId: userId },
      include: {
        job: true, // Include job details in the response
      },
    });

    if (applications.length === 0) {
      return res.status(404).json({ msg: 'No applied jobs found' });
    }

    res.status(200).json({ appliedJobs: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error retrieving applied jobs', error: err.message });
  }
});

// Get all jobs posted by the logged-in admin
router.get('/admin/jobs', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const adminId = req.user.id; // Assuming `req.user.id` is the admin's ID

  try {
      const jobs = await prisma.job.findMany({
          where: { createdById: adminId }, // Only fetch jobs created by the admin
          include: {
              applications: true, // Include related applications if needed
          },
      });

      res.status(200).json({ jobs });
  } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Failed to fetch jobs', error: err.message });
  }
});

// Get applicants for a specific job (Only Admin can access this)
router.get('/job/:jobId/applicants', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const jobId = parseInt(req.params.jobId);

  try {
    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Get all applicants for the job
    const applicants = await prisma.application.findMany({
      where: { jobId: jobId },
      include: {
        user: true, // Include user details who applied
      },
    });

    if (applicants.length === 0) {
      return res.status(404).json({ msg: 'No applicants for this job' });
    }

    res.status(200).json({ applicants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error retrieving applicants', error: err.message });
  }
});

module.exports = router;
