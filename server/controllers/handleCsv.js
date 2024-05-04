const CSV = require("../models/csvModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const CustomError = require("../utils/errorClass");
const sizeOf = require("image-size");
const csvData = require("csvtojson");
exports.uploadCsv = async (req, res, next) => {
  try {
    const file = req.file;

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({
        message: "Please select a file",
      });
    }
    csvData()
      .fromFile(file.path)
      .then(async (jsonObj) => {
        console.log(jsonObj);
      });
    const { name } = req.body;
    const adminData = await CSV.create({
      name,
    });

    // Respond with success
    res.status(200).json({
      success: true,
      data: adminData,
    });
  } catch (err) {
    console.error(err);
    return next(new CustomError(err.message, 500));
  }
};

exports.getAdminData = async (req, res, next) => {
  try {
    const csv = await CSV.find();
    res.status(200).json({
      success: true,
      data: csv,
    });
  } catch (err) {
    console.log(err.message);
    return next(new CustomError(err.message, 500));
  }
};

exports.updateAdminData = async (req, res, next) => {
  try {
    const { name, date, time } = req.body;

    // Validation: Check if required fields are present
    // if (!name || !date || !time) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Name, date, and time are required" });
    // }

    // Update CSV document by ID
    const csv = await CSV.findByIdAndUpdate(
      req.params.id,
      { name, date, time },
      { new: true }
    );

    // Check if CSV document exists
    if (!csv) {
      return res
        .status(404)
        .json({ success: false, message: "CSV data not found" });
    }

    // Send success response with updated CSV data
    res.status(200).json({ success: true, data: csv });
  } catch (err) {
    // Handle internal server error
    console.error("Error updating CSV data:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.deleteAdminData = async (req, res, next) => {
  try {
    const csv = await CSV.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: csv,
      message: "delete successfully",
    });
  } catch (err) {
    console.log(err.message);
    return next(new CustomError(err.message, 500));
  }
};
