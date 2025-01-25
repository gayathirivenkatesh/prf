// models/StudentProfileModel.js
import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  registrationNumber: String,
  department: String,
  dob: String,
  gender: String,
  phone: String,
  email: String,
  tenth: Number,
  tenthPassedYear: Number,
  twelfth: Number,
  twelfthPassedYear: Number,
  diploma: Number,
  diplomaPassedYear: Number,
  underGrad: String,
  cgpa: Number,
  resume: { type: String, default: null },
  photo: { type: String, default: null },
  alternatePhone: String,
  city: String,
  district: String,
  skills: [String],
  permanentAddress: String,
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;
