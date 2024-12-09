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
  name: String,
  price: Number,
});

const Item = mongoose.model("Item", itemSchema);

// Seed the database (optional)
const seedDatabase = async () => {
  const count = await Item.countDocuments();
  if (count === 0) {
    await Item.create([
      { name: "Apple", price: 1.2 },
      { name: "Banana", price: 0.8 },
    ]);
    console.log("Database seeded");
  }
};
seedDatabase();

// Define GET route
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
