const mongoose = require("mongoose");
const csvDataSchema = new mongoose.Schema({
  Year: {
    type: String,
  },
  Industry_aggregation_NZSIOC: {
    type: String,
  },
  Industry_code_NZSIOC: {
    type: String,
  },
  Industry_name_NZSIOC: {
    type: String,
  },
  Units: {
    type: String,
  },
  Variable_code: {
    type: String,
  },
  Variable_name: {
    type: String,
  },
  Variable_category: {
    type: String,
  },
  Value: {
    type: String,
  },
  Industry_code_ANZSIC06: {
    type: String,
  },
});
const csvDataModel = mongoose.model("csvData", csvDataSchema);

module.exports = csvDataModel;
