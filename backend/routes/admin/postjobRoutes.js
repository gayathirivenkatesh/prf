import express from 'express';
import upload from '../../middleware/upload.js'; 
import PostJobModel from '../../models/admin/PostJobModel.js';

const router = express.Router();

// Middleware to validate required fields
const validateJobDetails = (req, res, next) => {
  const requiredFields = ['jobTitle', 'companyName', 'jobDescription', 'salary', 'location', 'jobType', 'jobCategory','jobDate'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  next();
};

// POST: Create a new job offer
router.post('/', upload.single('jobFile'), validateJobDetails, async (req, res, next) => {
  try {
    // Prepare job details
    const jobDetails = {
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      jobDescription: req.body.jobDescription,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      jobCategory: req.body.jobCategory,
      jobDate: req.body.jobDate || new Date(), 
      jobFile: req.file ? req.file.path : null,
      eligibilityCriteria: {
        minCGPA: req.body.minCGPA,
        backlogsAllowed: req.body.backlogsAllowed === 'true',
        educationalQualification: req.body.educationalQualification,
        minAttendance: req.body.minAttendance,
        certifications: req.body.certifications?.split(','),
        skills: req.body.skills?.split(','),
        softSkills: req.body.softSkills?.split(','),
        extracurriculars: req.body.extracurriculars?.split(','),
        conduct: req.body.conduct,
        registrationRequired: req.body.registrationRequired === 'true',
        placementTests: req.body.placementTests?.split(','),
        branchStream: req.body.branchStream?.split(','),
      },
    };

    // Create and save the new job offer
    const newJobOffer = new PostJobModel(jobDetails);
    await newJobOffer.save();

    res.status(201).json({ message: 'Job offer created successfully', jobOffer: newJobOffer });
  } catch (error) {
    next(error);
  }
});

export default router;
