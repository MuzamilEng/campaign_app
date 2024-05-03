const mongoose = require("mongoose");
const csvSchema = new mongoose.Schema(
  {
    csvFile: {
      type: String,
      // required:[true,'csv file is required']
    },
  },
  { timestamps: true }
);
const Csv = mongoose.model("Csv", csvSchema);
module.exports = Csv;
