const express = require("express");
const router = express.Router();

const { Doctor, Department }  = require("../models/DoctorSchema");

router.post("/department", async (req, res) => {
  try {
    const { Id, Departments, Description } = req.body;

    // Validate input data
    if (!Id) {
      return res.status(400).json({ message: "id is required." });
    }
    console.log(Id, Departments, Description);
    // Insert document using the `insertMany()` function
    const newDepartment = await Department.create([
      { Id, Departments, Description },
    ]);

    res.status(201).json({
      message: "Department created successfully.",
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error inserting department:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
});

router.post("/doctor", async (req, res) => {
  try {
    const {
      Id,
      User_id,
      Category_id,
      Qualification,
      Specialty,
      Experience,
      Is_Available,
      Name,
      NMC_No,
      price,
      Description,
    } = req.body;

    // Validate input data
    if (!Id) {
      return res.status(400).json({ message: "id is required." });
    }
    console.log(
      Id,
      User_id,
      Category_id,
      Qualification,
      Specialty,
      Experience,
      Is_Available,
      Name,
      NMC_No,
      price,
      Description
    );
    // Insert document using the `insertMany()` function
    const newDoctor = await Doctor.create([
      {
        Id,
        User_id,
        Category_id,
        Qualification,
        Specialty,
        Experience,
        Is_Available,
        Name,
        NMC_No,
        price,
        Description,
      },
    ]);

    res.status(201).json({
      message: "DoctorData created successfully.",
      data: newDoctor,
    });
  } catch (error) {
    console.error("Error inserting department:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
});

router.get("/getDoctorData", async (req, res) => {
  try {
    const items = await Doctor.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;
