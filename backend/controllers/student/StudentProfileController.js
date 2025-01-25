import StudentProfile from '../../models/student/StudentProfileModel';

// Get Student Profile by ID
export const getStudentProfile = async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findById(req.params.id);
    if (!studentProfile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(studentProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Student Profile
export const updateStudentProfile = async (req, res) => {
  try {
    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
