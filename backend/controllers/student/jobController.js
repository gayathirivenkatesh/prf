import PostJobModel from '../../models/admin/PostJobModel.js';

// Fetch eligibility criteria and available jobs for students
export const getEligibilityAndJobs = async (req, res) => {
  try {
    const { minCGPA, backlogsAllowed, branchStream } = req.query;

    // Construct filter criteria based on query parameters
    const filter = {
      'eligibilityCriteria.minCGPA': { $lte: parseFloat(minCGPA) || 10 },
      'eligibilityCriteria.backlogsAllowed': backlogsAllowed === 'true',
      'eligibilityCriteria.branchStream': branchStream || /.*/,
    };

    // Fetch job offers matching the criteria
    const jobOffers = await PostJobModel.find(filter);

    // If no job offers match the criteria
    if (!jobOffers || jobOffers.length === 0) {
      return res.status(404).json({ message: 'No job offers found matching the eligibility criteria' });
    }

    res.status(200).json({ jobOffers });
  } catch (error) {
    console.error('Error fetching eligible jobs:', error.message);
    res.status(500).json({ error: 'Failed to fetch eligible jobs' });
  }
};

// Fetch all job offers for students (no filters applied)
export const getAllJobsForStudents = async (_req, res) => {
  try {
    const jobOffers = await PostJobModel.find();
    res.status(200).json({ jobOffers });
  } catch (error) {
    console.error('Error fetching all jobs:', error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Fetch a single job offer by ID for detailed view
export const getJobDetails = async (req, res) => {
  try {
    const jobOffer = await PostJobModel.findById(req.params.id);

    if (!jobOffer) {
      return res.status(404).json({ error: 'Job offer not found' });
    }

    res.status(200).json({ jobOffer });
  } catch (error) {
    console.error('Error fetching job details:', error.message);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
};
