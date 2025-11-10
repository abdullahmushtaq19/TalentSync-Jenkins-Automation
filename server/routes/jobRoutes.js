const express = require('express');
const jobController = require('../controllers/jobController'); 
const router = express.Router();
router.get('/api/jobs', jobController.getAllJobs);
router.post('/api/jobs', jobController.createJob);
router.post('/api/jobs/apply',jobController.submitJobApplication);

module.exports = router;
