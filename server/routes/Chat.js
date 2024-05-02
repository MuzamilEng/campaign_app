const express = require("express");
const router = express.Router();
const { accessChat, fetchChats} = require("../controllers/Chat");
const { authenticateJWT } = require('../middleware/authMiddleware');



router.route("/").post(authenticateJWT, accessChat);
router.route("/").get(authenticateJWT, fetchChats);

module.exports = router;