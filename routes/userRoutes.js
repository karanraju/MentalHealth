const express = require("express");
const User = require("../models/user");
const mongoose = require("mongoose");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Get all users
const Usermodel = mongoose.model("UserData", UserSchema);
router.get("/getUsers", (req, res) => {
  Usermodel.find({})
    .then(function (users) {
      console.log("userr",users)
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});
// router.get("/user", async (req, res) => {
//   try {
//     const users = await inventory.find();
//     console.log("djhjff", users);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
