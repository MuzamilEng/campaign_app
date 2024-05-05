const CSV = require("../models/csvModel");
const CustomError = require("../utils/errorClass");
const fs = require('fs');
const csvParser = require('csv-parser');

/** ------------------ EXPORTING FUNCTION To upload a file ------------------ **/
exports.UploadCsv = async function(req, res) {
  console.log('called');
    try {
      const { name } = req.body;
        // file is not present
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // file is not csv
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
        // console.log(req.file);
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename,
            name
        });
    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}

/** ------------------ EXPORTING FUNCTION To open file viewer page ------------------ **/
module.exports.view = async function(req, res) {
    try {
        // console.log(req.params);
        let csvFile = await CSV.findOne({file: req.params.id});
        // console.log(csvFile);
        const results = [];
        const header =[];
        fs.createReadStream(csvFile.filePath) //seeting up the path for file upload
        .pipe(csvParser())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
            // console.log(header);
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            // console.log(results.length);
            // console.log(results);
            res.render("file_viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

/** ------------------ EXPORTING FUNCTION To delete the file ------------------ **/
module.exports.delete = async function(req, res) {
    try {
        // console.log(req.params);
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}

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
