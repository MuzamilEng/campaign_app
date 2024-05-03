const express = require("express");
const router = express.Router();
const { uploadCsv } = require("../controllers/handleCsv");
const upload = require("../utils/multer");
router.route("/upload").post(upload.single("csvFile"), uploadCsv);
module.exports = router;
