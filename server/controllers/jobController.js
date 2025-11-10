// jobController.js
const Job = require('../models/jobs');
const JobApplication=require('../models/JobApplication');
const multer=require('multer');
const path=require('path');


const getAllJobs = async (req, res) => {
  try {
    const { job_name, location } = req.query;
    const query = {};

    if (job_name) {
      query["Job Title"] = { $regex: job_name, $options: 'i' }; d
    }

    if (location) {
      query.Location = { $regex: location, $options: 'i' }; 
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Error fetching jobs');
  }
};

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).send('Error creating job');
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const submitJobApplication = async (req, res) => {
  try {
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }

      const { job_id, firstName, lastName, email, phone, positionApplied, coverLetter, interviewDate } = req.body;
      const resume = req.file?.path; 

      const jobApplication = new JobApplication({
        job_id,
        firstName,
        lastName,
        email,
        phone,
        positionApplied,
        coverLetter,
        interviewDate,
        resume,
      });

      await jobApplication.save();
      res.status(201).json({ message: 'Application submitted successfully', jobApplication });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error applying for the job' });
  }
};
module.exports = { getAllJobs, createJob ,submitJobApplication};
