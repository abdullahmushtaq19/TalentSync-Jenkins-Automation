const Company = require('../models/companies');
const getAllCompanies = async (req, res) => {
  try {
    const { company_name, location, industry } = req.query;
    const filters = {};
    if (company_name) {
      filters.company_name = { $regex: company_name, $options: 'i' }; 
    }

    if (location) {
      filters.country = { $regex: location, $options: 'i' };  
    }
    if (industry) {
      filters.industry = { $regex: industry, $options: 'i' };  
    }

    const companies = await Company.find(filters);

    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching companies');
  }
};
module.exports = { getAllCompanies };
