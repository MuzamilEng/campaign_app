const CSV = require("../models/csvModel");
const uploadOnCloudinary = require("../utils/cloudinary");
exports.uploadCsv = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) {
      res.status(400).json({
        message: "Please select a file",
      });
    }
    console.log(file.path);
    // const csv = await uploadOnCloudinary(file.path);
    // await CSV.create({
    //   csvFile: csv,
    // });
    res.status(200).json({
      message: "File uploaded successfully",
    });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};
