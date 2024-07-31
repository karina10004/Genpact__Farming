const express = require("express");
const connectDB = require("./db/connect"); // Adjust path as necessary
const dotenv = require("dotenv");
const app = express();
dotenv.config();
// Connect to MongoDB
connectDB();

app.use(express.json());

// Your routes and middleware here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
