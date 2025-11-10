const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  "Job Title": {
    type: String,
    required: true
  },
  "Salary Estimate": {
    type: String,
    required: true
  },
  "Job Description": {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    default: 0
  },
  "Company Name": {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Headquarters: {
    type: String
  },
  Size: {
    type: String
  },
  Founded: {
    type: Number
  },
  "Type of ownership": {
    type: String
  },
  Industry: {
    type: String
  },
  Sector: {
    type: String
  },
  Revenue: {
    type: String
  },
  Competitors: {
    type: String,
    default: "-1"
  },
  "Easy Apply": {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
