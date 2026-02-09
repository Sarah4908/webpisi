const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ph: Number,
    temperature: Number,
    waterLevel: Number,
  },
  { timestamps: true } // 👈 adds createdAt & updatedAt
);

module.exports = mongoose.model("SensorData", sensorDataSchema);

