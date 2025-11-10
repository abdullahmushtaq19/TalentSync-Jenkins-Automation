const mongoose = require('mongoose');
const { Schema } = mongoose;
const companySchema = new Schema({
  company_name: {
    type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    employees: {
      type: Number,
      required: true,
    },
    linkedin_url: {
      type: String,
      required: true,
    },
    founded: {
      type: Number,
      required: true,
    },
    Industry: {
      type: String,
      required: true,
    },
    GrowjoRanking: {
      type: Number,
      required: true,
    },
    PreviousRanking: {
      type: Number,
      required: true,
    },
    estimated_revenues: {
      type: Number,
      required: true,
    },
    job_openings: {
      type: Number,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    LeadInvestors: {
      type: String,
      required: true,
    },
    btype: {
      type: String,
      required: true,
    },
    valuation: {
      type: Number,
      required: true,
    },
    total_funding: {
      type: String, 
      required: true,
    },
    product_url: {
      type: String,
      required: true,
    },
    indeed_url: {
      type: String,
      required: true,
    },
    growth_percentage: {
      type: String,
      required: true,
    },
    contact_info: {
      type: String,
      required: true,
    }
});
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
