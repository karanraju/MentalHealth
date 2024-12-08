// // const express = require("express");
// // const mongoose = require("mongoose");
// // const dotenv = require("dotenv");

// // const app = express();
// // dotenv.config();
// // const mongoDB = "mongodb://localhost:27017/mentalHealthDataBase";

// // const PORT = 5000;

// // async function connectDB() {
// //   try {
// //     await mongoose.connect("mongodb://localhost:27017/MentalHealthDb");
// //     console.log("Connected to MongoDB");
// //   } catch (err) {
// //     console.error("Failed to connect to MongoDB", err);
// //   }
// // }

// // const userSchema = new mongoose.Schema({
// //   name: String,
// //   age: Number,
// // });

// // const UserModel=mongoose.model("UserData",userSchema)

// // app.get("/getUsers",async(req,res)=>{
// //     const userData=await UserModel.find();
// //     console.log("fuhf",userData)
// //     res.json(userData);
// // });

// // connectDB();
// // app.listen(5000, () => {
// //   console.log("Server is running");
// // });

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/mydatabase", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
