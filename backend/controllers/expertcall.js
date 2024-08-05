const ExpertCall = require("../models/expertcall");

// Create a new expert call
exports.createExpertCall = async (req, res) => {
  try {
    const expertCall = new ExpertCall(req.body);
    await expertCall.save();
    res.status(201).json(expertCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expert calls
exports.getAllExpertCalls = async (req, res) => {
  try {
    const expertCalls = await ExpertCall.find()
      .populate("farmer_id")
      .populate("expert_id");
    res.status(200).json(expertCalls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single expert call by ID
exports.getExpertCallById = async (req, res) => {
  try {
    const expertCall = await ExpertCall.findById(req.params.id)
      .populate("farmer_id")
      .populate("expert_id");
    if (!expertCall) {
      return res.status(404).json({ error: "Expert call not found" });
    }
    res.status(200).json(expertCall);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expert call by ID
exports.updateExpertCallById = async (req, res) => {
  try {
    const expertCall = await ExpertCall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!expertCall) {
      return res.status(404).json({ error: "Expert call not found" });
    }
    res.status(200).json(expertCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an expert call by ID
exports.deleteExpertCallById = async (req, res) => {
  try {
    const expertCall = await ExpertCall.findByIdAndDelete(req.params.id);
    if (!expertCall) {
      return res.status(404).json({ error: "Expert call not found" });
    }
    res.status(200).json({ message: "Expert call deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCallStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const expertCall = await ExpertCall.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!expertCall) {
      return res.status(404).json({ error: "Call request not found" });
    }

    res.status(200).json(expertCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
