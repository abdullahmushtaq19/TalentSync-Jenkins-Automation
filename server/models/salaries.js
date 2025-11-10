const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  Id: {
    type: Number,
    required: true,
  },
  EmployeeName: {
    type: String,
    required: true,
  },
  JobTitle: {
    type: String,
    required: true,
  },
  BasePay: {
    type: Number,
    required: true,
  },
  OvertimePay: {
    type: Number,
    required: true,
  },
  OtherPay: {
    type: Number,
    required: true,
  },
  TotalPay: {
    type: Number,
    required: true,
  },
  TotalPayBenefits: {
    type: Number,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Agency: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Salary = mongoose.model('Salary', employeeSchema);

module.exports = Salary;
