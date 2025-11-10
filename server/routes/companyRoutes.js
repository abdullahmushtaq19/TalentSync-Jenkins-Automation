const express = require('express');
const companyController = require('../controllers/companyController'); // Ensure correct path

const router = express.Router();

// Define routes
router.get('/api/companies', companyController.getAllCompanies);


module.exports = router;
