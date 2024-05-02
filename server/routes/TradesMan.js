const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTrademanProfile, updateTrademanProfile, deleteTrademanProfile, getAllTradesmenProfiles, getTrademanProfileById, getTrademanProfileByEmail, allTradesMen, searchTrademan } = require('../controllers/Tradesmen');
const { authenticateJWT } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  // destination: ('./public/uploads/'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: '50mb' }
});

// var videoSize = 30 * 1024 * 1024;
// console.log(videoSize, 'videoSize');

// const uploadFiles = upload.single('image');
const uploadFiles = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gigImage1', maxCount: 1 },
  { name: 'gigImage2', maxCount: 1 },
  { name: 'gigImage3', maxCount: 1 },
  // { name: 'video', maxCount: 1 }, // Increase limit for video field
]);





// Get all lettings
router.route('/createTrademanProfile').post(uploadFiles, createTrademanProfile);
router.route('/').get(getAllTradesmenProfiles);
router.route('/getProfile').get(getTrademanProfileByEmail);
router.route('/getAllTradesmen').get( allTradesMen);

// Create a new letting

// Update an existing letting by ID
router.route('/update/:id').put(uploadFiles, updateTrademanProfile);

// Get a letting by ID and Delete a letting by ID
router.route('/:id').get(getTrademanProfileById).delete(deleteTrademanProfile);
router.route('/search').post(searchTrademan)
module.exports = router;