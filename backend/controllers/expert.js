const Expert = require("../models/expert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new expert
exports.registerExpert = async (req, res) => {
  const { name, specialization, contact_info, availability, email, password } =
    req.body;

  try {
    // Check if expert already exists
    let expert = await Expert.findOne({ email });
    if (expert) {
      return res.status(400).json({ msg: "Expert already exists" });
    }

    // Create a new expert
    expert = new Expert({
      name,
      specialization,
      contact_info,
      availability,
      email,
      password,
    });

    await expert.save();

    // Generate a token
    const payload = { expert: { id: expert.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login an expert
exports.loginExpert = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if expert exists
    const expert = await Expert.findOne({ email });
    if (!expert) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, expert.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate a token
    const payload = { expert: { id: expert.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ expert });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find({});
    res.json(experts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//module.exports = { getAllExperts };
