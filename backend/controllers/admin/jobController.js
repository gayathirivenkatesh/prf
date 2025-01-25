import PostJobModel from '../../models/admin/PostJobModel.js';

// Create a new job offer
export const createJobOffer = async (req, res) => {
  try {
    const jobDetails = {
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      jobDescription: req.body.jobDescription,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      jobCategory: req.body.jobCategory,
      jobFile: req.file ? req.file.path : null,
      eligibilityCriteria: {
        minCGPA: req.body.minCGPA,
        backlogsAllowed: req.body.backlogsAllowed === 'true',
        educationalQualification: req.body.educationalQualification,
        minAttendance: req.body.minAttendance,
        certifications: req.body.certifications,
        skills: req.body.skills,
        softSkills: req.body.softSkills,
        extracurriculars: req.body.extracurriculars,
        conduct: req.body.conduct,
        registrationRequired: req.body.registrationRequired === 'true',
        placementTests: req.body.placementTests,
        branchStream: req.body.branchStream,
      },
    };

    const newJobOffer = new PostJobModel(jobDetails);
    await newJobOffer.save();

    res.status(201).json({ message: 'Job offer created successfully', jobOffer: newJobOffer });
  } catch (error) {
    console.error('Error creating job offer:', error.message);
    res.status(500).json({ error: 'Failed to create job offer' });
  }
};

// Get all job offers
export const getAllJobOffers = async (req, res) => {
  try {
    const jobOffers = await PostJobModel.find();
    res.status(200).json(jobOffers);
  } catch (error) {
    console.error('Error fetching job offers:', error.message);
    res.status(500).json({ error: 'Failed to fetch job offers' });
  }
};

// Get a specific job offer by ID
export const getJobOfferById = async (req, res) => {
  try {
    const jobOffer = await PostJobModel.findById(req.params.id);
    if (!jobOffer) {
      return res.status(404).json({ error: 'Job offer not found' });
    }
    res.status(200).json(jobOffer);
  } catch (error) {
    console.error('Error fetching job offer:', error.message);
    res.status(500).json({ error: 'Failed to fetch job offer' });
  }
};

// Update a job offer
export const updateJobOffer = async (req, res) => {
  try {
    const updatedJobOffer = await PostJobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJobOffer) {
      return res.status(404).json({ error: 'Job offer not found' });
    }
    res.status(200).json(updatedJobOffer);
  } catch (error) {
    console.error('Error updating job offer:', error.message);
    res.status(500).json({ error: 'Failed to update job offer' });
  }
};

// Delete a job offer
export const deleteJobOffer = async (req, res) => {
  try {
    const deletedJobOffer = await PostJobModel.findByIdAndDelete(req.params.id);

    if (!deletedJobOffer) {
      return res.status(404).json({ error: 'Job offer not found' });
    }
    res.status(200).json({ message: 'Job offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting job offer:', error.message);
    res.status(500).json({ error: 'Failed to delete job offer' });
  }
};
