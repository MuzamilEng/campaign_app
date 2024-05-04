const mongoose = require("mongoose");
const csvSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },

    name: {
      type: String,
    },

    status: {
      type: String,
      default: "Waiting",
    },
  },
  { timestamps: true }
);
const Csv = mongoose.model("Csv", csvSchema);
module.exports = Csv;
