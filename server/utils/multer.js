const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/temp");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using UUID (Universally Unique Identifier)
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
