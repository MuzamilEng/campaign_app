const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {signUp, login, getUserDetails, allUsers} = require('../controllers/auth');
const storage = multer.diskStorage({
    // destination: ('./public/uploads/'),
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 10 * 1024 * 1024, 
    }
  });
  
  const uploadFiles = upload.single('image');


router.route('/signup').post(uploadFiles,signUp);
router.route('/login').post(login);
router.route('/getDetails').get(getUserDetails);
router.route('/getAllUsers').get( allUsers);

module.exports = router