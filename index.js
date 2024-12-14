const express = require("express");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/mydatabase"; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Schema and Model
const itemSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  dataOfBirth: String,
  phone: String,
});

const TherapistsSchema = new mongoose.Schema({
  TherapistID: String,
  Name: String,
  Specialty: String,
  Rating: String,
});

const DepartmentSchema = new mongoose.Schema({
  Id: Number,
  Departments: String,
  Description: String,
});

const DateSchema = new mongoose.Schema({
  customername: {
    type: String,
    required: true, // Makes this field mandatory
    trim: true, // Removes leading/trailing whitespace
  },
  date: {
    type: String,
    required: true,
    date: {
      type: String,
      validate: {
        validator: function (value) {
          return moment(value, "YYYY/MM/DD", true).isValid(); // Adjust format as needed
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },
  },
  start: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates HH:MM format
      },
      message: (props) => `${props.value} is not a valid start time!`,
    },
  },
  end: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates HH:MM format
      },
      message: (props) => `${props.value} is not a valid end time!`,
    },
  },
});

const UserData = mongoose.model("UserData", itemSchema);
const TherapistsData = mongoose.model("TherapistData", TherapistsSchema);
const Department = mongoose.model("Department", DepartmentSchema);
const Date = mongoose.model("Date", DateSchema);

// Seed the database (optional)
const seedDatabase = async () => {
  const count = await UserData.countDocuments();
  if (count === 0) {
    await UserData.create([
      {
        userId: 1,
        firstName: "karan",
        lastName: "shah",
        email: "karankumar20146@gmail.com",
        gender: "Male",
        dataOfBirth: "1997/06/28",
        phone: "982487722",
      },
    ]);
    console.log("Database seeded");
  }
};

const seedDatebase = async () => {
  const count = await Date.countDocuments();
  if (count === 0) {
    await Date.create([
      {
        customername: "Kostas",
        date: "2040/12/12",
        start: "12:00",
        end: "12:30",
      },
      {
        customername: "Amar",
        date: "2040/12/11",
        start: "12:00",
        end: "12:30",
      },
    ]);
    console.log("Database seeded");
  }
};

const seedDepartment = async () => {
  const count = await Department.countDocuments();
  if (count === 0) {
    await Department.create([
      {
        Id: 1,
        Deparment: "Schizophrenia",
      },
      {
        Id: 2,
        Department: "Depression",
      },
      {
        Id: 3,
        Department: "Tourette Syndrome",
      },
      {
        Id: 4,
        Department: "Obsessive Compulsive Disorder",
        Description: " this is the treatment",
      },
      {
        Id: 5,
        Department: "Obsessive Compulsive Disorder",
        Description: " this is the treatment",
      },
    ]);
    console.log("Database seeded");
  }
};

const seedTherapistsData = async () => {
  const count = await TherapistsData.countDocuments();
  if (count === 0) {
    await TherapistsData.create([
      {
        TherapistID: 1,
        Name: "Suman",
        Specialty: "Dr.gahdj",
        email: "karankumar20146@gmail.com",
        Rating: "5",
      },
    ]);
    console.log("Database seeded");
  }
};

seedDatabase();
seedTherapistsData();
seedDepartment();
seedDatebase();

// Define GET route
app.get("/User", async (req, res) => {
  try {
    const items = await UserData.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// const departmentSchema = new mongoose.Schema({
//   name: { type: String },
//   description: { type: String },
// });

// const Department = mongoose.model("Department", departmentSchema);

app.post("/department", async (req, res) => {
  try {
    const { Id, Departments, Description } = req.body;

    // Validate input data
    if (!Id) {
      return res.status(400).json({ message: "id is required." });
    }
  console.log(Id, Departments, Description)
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
