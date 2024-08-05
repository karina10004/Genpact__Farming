const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expertCallSchema = new Schema(
  {
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId, // Assuming farmer_id references a farmer in another collection
      required: true,
      ref: "Farmer", // Assuming you have a 'Farmer' model
    },
    expert_id: {
      type: mongoose.Schema.Types.ObjectId, // Assuming expert_id references an expert in the experts collection
      required: true,
      ref: "Expert", // Reference to the Expert model
    },
    call_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Cancelled"], // Example statuses
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpertCall", expertCallSchema);
