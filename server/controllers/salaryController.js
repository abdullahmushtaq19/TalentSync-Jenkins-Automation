const Salary = require('../models/salaries');

const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    const jobTitle = req.query.job_title;

    if (jobTitle) {
      const filteredSalaries = salaries.filter(
        salary => salary.JobTitle === jobTitle
      );
      return res.json(filteredSalaries);
    }

    return res.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    return res.status(500).send("Error fetching salaries");
  }
};

module.exports = { getAllSalaries };
