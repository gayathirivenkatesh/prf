// models/admin/PostJobModel.js

import mongoose from 'mongoose';

const PostJobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  jobDescription: String,
  salary: Number,
  location: String,
  jobType: String,
  jobDate: Date,
  jobFile: String,
  eligibilityCriteria: {
    minCGPA: Number,
    backlogsAllowed: Boolean,
    educationalQualification: String,
    minAttendance: Number,
    certifications: String,
    skills: String,
    softSkills: String,
    extracurriculars: String,
    conduct: String
  },
  status: { type: String, default: 'open' },
  studentsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] 
});

const PostJobModel = mongoose.model('PostJob', PostJobSchema);

export default PostJobModel;
