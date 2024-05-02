const express = require("express");
const { allMessages, sendMessage } = require("../controllers/Message");
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/:chatId").get(authenticateJWT, allMessages);
router.route("/").post(authenticateJWT, sendMessage);

module.exports = router;