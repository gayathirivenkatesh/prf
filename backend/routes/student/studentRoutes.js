import express from 'express';
import mongoose from 'mongoose';
import PostJobModel from '../../models/admin/PostJobModel.js';

const router = express.Router();

// GET: Fetch job offers and eligibility criteria for students
router.get('/', async (req, res) => {
  try {
    const jobOffers = await PostJobModel.find();
    const eligibilityCriteria = jobOffers.map((job) => job.eligibilityCriteria);

    res.status(200).json({ jobOffers, eligibilityCriteria });
  } catch (error) {
    console.error('Error fetching job offers:', error.message);
    res.status(500).json({ error: 'Failed to fetch job offers' });
  }
});

// POST: Apply for a job
router.post('/apply/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate the jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: 'Invalid Job ID format' });
    }

    // Replace with actual authentication logic
    const studentId = req.user ? req.user._id : "mockStudentIdForTesting";

    // Find the job by ID
    const job = await PostJobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if the student has already applied
    if (job.studentsApplied.includes(studentId)) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Add student to the applied list
    job.studentsApplied.push(studentId);

    await job.save();

    res.status(200).json({ message: 'Job applied successfully', job });
  } catch (error) {
    console.error('Error applying for job:', error.message);
    res.status(500).json({ error: 'Failed to apply for the job', details: error.message });
  }
});

export default router;
