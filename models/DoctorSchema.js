const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  therapist_price: {
    type: String,
    required: true,
  },
  Appointment_Price: {
    type: String,
    required: true,
  },
});

const DoctorSchema = new mongoose.Schema({
  Id: Number,
  User_id: Number,
  Category_id: Number,
  Qualification: String,
  Specialty: String,
  Experience: Number,
  Is_Available: String,
  Name: String,
  NMC_No: String,
  price: {
    type: [PriceSchema],
    required: true,
  },

  Description: String,
});

const DepartmentSchema = new mongoose.Schema({
  Id: Number,
  Departments: String,
  Description: String,
});

module.exports = {
  Doctor: mongoose.model("Doctor", DoctorSchema),
  Department: mongoose.model("Department", DepartmentSchema),
};
