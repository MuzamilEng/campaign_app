const express = require("express");
const multer = require("multer");
const { authenticateJWT } = require("../middleware/authMiddleware");

const Review = require("../models/Reviews");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Store images in the 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.post('/upload-images', upload.array('images', 5), (req, res) => {
//   const uploadedImageUrls = req.files.map((file) => `/uploads/${file.filename}`);
//   res.status(200).json({ imageUrls: uploadedImageUrls });
//   });

router.post(
  "/add-review/:id",
  authenticateJWT,
  upload.array("images", 5),
  async function (req, res) {
    try {
      console.log(req.body);
      console.log("postAnonymous:", req.body.postAnonymous);
      console.log("name:", req.body.name);
      console.log("images:", req.files);
      const newReview = {
        name:
          req.body.postAnonymous === "true" ? "Anonymous User" : req.body.name,
        datePosted: Date.now(),
        tradesmanId: req.params.id,
        overallRating: req.body.overallRating,
        featureRatings: req.body.featureRatings,
        textReview: req.body.textReview,
        images: req.files.map((file) => file.filename),
        postAnonymous: req.body.postAnonymous,
      };
      console.log("New Review: ", newReview);
      const featureRatings = JSON.parse(newReview.featureRatings);
      const review = new Review({ ...newReview, featureRatings });
      // const review = new Review(newReview)
      console.log("Review to save: ", review);
      await review.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).json({ message: "Review added successfully" });
        }
      });
    } catch (error) {}
  }
);

router.get("/get-reviews/:id", authenticateJWT, async function (req, res) {
  try {
    const reviews = await Review.find({ tradesmanId: req.params.id });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
