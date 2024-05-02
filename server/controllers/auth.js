const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tradesmen = require("../models/Tradesmen");
const { authenticateJWT } = require("../middleware/authMiddleware");
const passport = require("passport");
const cloudinary = require("../cloudinary.config");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, category, password, email, phoneNumber } =
      req.body;
    let mainImageURL;
    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (req.file) {
      const mainImage = req.file;
      console.log(mainImage, "mainImage", "file");
      const mainImageResult = await cloudinary.uploader.upload(mainImage.path, {
        folder: "Assets",
      });
      mainImageURL = mainImageResult.secure_url;
      console.log(mainImageURL, "mainImageURL");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      category,
      password: hashedPassword,
      email,
      phoneNumber,
      image: mainImageURL,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      user: savedUser,
    });
  } catch (error) {
    console.log(error, "error aa");
    res.status(500).json({ error: error.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!user) {
        return res.status(401).json({ error: info.message });
      }

      try {
        // Generate and sign a JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          "JSONWEBTOKKENSECRETKEY!@#$%^&*()",
          {
            expiresIn: "12d",
          }
        );

        // Find the associated tradesman profile using the user's ID
        const tradesmanProfile = await Tradesmen.findOne({ user: user._id });
        console.log(tradesmanProfile, "profile here");

        // If a tradesman profile is found, populate it
        if (tradesmanProfile) {
          await tradesmanProfile.populate("user").execPopulate();
        }

        // Send the token, user details, and tradesman profile (if available) in the response
        return res.json({ token, user, tradesmanProfile });
      } catch (error) {
        console.error("Error retrieving tradesman profile:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  )(req, res, next);
};

const getUserDetails = (req, res) => {
  console.log(req.body, "token here");
  // Use the authenticateJWT middleware before processing the request
  authenticateJWT(req, res, async () => {
    // Access the authenticated user through req.user
    const user = req.user;

    // Send user details in the response
    return res.json({
      id: user?._id,
      username: user?.firstName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      category: user?.category,
      image: user?.image,
    });
  });
};

const allUsers = async (req, res) => {
  console.log(req.query, "query");
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const profiles = await User.find(keyword).find({
      _id: { $ne: req?.user?._id },
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  login,
  getUserDetails,
  allUsers,
};
