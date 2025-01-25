import express from 'express';
import upload from '../../middleware/upload.js'; // Path to your upload middleware
import StudentProfile from '../../models/student/StudentProfileModel.js';

const router = express.Router();

// POST route for handling student profile uploads
router.post('/', upload.fields([{ name: 'photo' }, { name: 'resume' }]), async (req, res) => {
  try {
    const profileData = req.body;

    // Extract file paths from the uploaded files
    profileData.photo = req.files?.photo?.[0]?.path || null;
    profileData.resume = req.files?.resume?.[0]?.path || null;

    // Check if the profile already exists by email
    const existingProfile = await StudentProfile.findOne({ email: profileData.email });

    if (existingProfile) {
      // Update the existing profile
      await StudentProfile.updateOne({ email: profileData.email }, profileData);
      res.status(200).json({ message: 'Profile updated successfully!' });
    } else {
      // Create a new profile
      const newProfile = new StudentProfile(profileData);
      await newProfile.save();
      res.status(201).json({ message: 'Profile created successfully!' });
    }
  } catch (error) {
    console.error('Error saving profile:', error.message);
    res.status(500).json({ message: 'Error saving profile', error: error.message });
  }
});

// Export the router
export default router;
