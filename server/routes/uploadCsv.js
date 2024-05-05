const express = require("express");
const router = express.Router();
const {
  UploadCsv,
  getAdminData,
  updateAdminData,
  deleteAdminData,
} = require("../controllers/handleCsv");
const upload = require("../utils/multer");
router.route("/upload").post(upload.single("file"), UploadCsv);
router.route("/getAdminData").get(getAdminData);
router.route("/updateAdminData/:id").put(updateAdminData);
router.route("/deleteAdminData/:id").delete(deleteAdminData);
module.exports = router;
