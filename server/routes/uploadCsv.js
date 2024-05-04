const express = require("express");
const router = express.Router();
const {
  uploadCsv,
  getAdminData,
  updateAdminData,
  deleteAdminData,
} = require("../controllers/handleCsv");
const upload = require("../utils/multer");
router.route("/upload").post(upload.single("file"), uploadCsv);
router.route("/getAdminData").get(getAdminData);
router.route("/updateAdminData/:id").put(updateAdminData);
router.route("/deleteAdminData/:id").delete(deleteAdminData);
module.exports = router;
