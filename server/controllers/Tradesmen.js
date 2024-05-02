const TrademanSchema = require("../models/Tradesmen");
const cloudinary = require("../cloudinary.config");
const User = require("../models/User");

const createTrademanProfile = async (req, res) => {
  try {
    const {
      tradeType,
      location,
      phoneNumber,
      description,
      hourlyRate,
      lat,
      lng,
    } = req.body;
    console.log(req.body);

    const userId = req?.body?.userId;
    const user = await User.findById(userId);
    console.log(user, "user", userId);
    console.log(req.body, "req.body");
    const parsedLat = Number(lat?.[1]);
    const parsedLng = Number(lng?.[1]);
    console.log(parsedLat);
    console.log(parsedLng);
    let mainImageURL;

    // Handle main image update
    if (req.files && req.files.image) {
      const mainImage = req.files.image[0];
      const mainImageResult = await cloudinary.uploader.upload(mainImage.path, {
        folder: "Assets",
      });

      if (mainImageResult.error) {
        console.error(
          "Cloudinary upload error for main image:",
          mainImageResult.error
        );
        // Handle the error appropriately
      }

      mainImageURL = mainImageResult.secure_url;
    }

    // Handle gig images update
    const gigImages = [];

    for (let i = 1; i <= 3; i++) {
      const gigImageField = `gigImage${i}`;
      // console.log(gigImageField, 'gigImageField');

      if (req.files && req.files[gigImageField]) {
        const gigImage = req.files[gigImageField][0];
        const gigImageResult = await cloudinary.uploader.upload(gigImage.path, {
          folder: "Assets",
        });
        gigImages.push(gigImageResult.secure_url);
      }
    }

    const newContent = new TrademanSchema({
      user: user?._id,
      tradeType,
      location,
      phoneNumber,
      description,
      hourlyRate,
      lat: parsedLat,
      lng: parsedLng,
      image: mainImageURL,
      gigImage1: gigImages[0],
      gigImage2: gigImages[1],
      gigImage3: gigImages[2],
    });

    const savedContent = await newContent.save();

    const responseObj = {
      ...savedContent._doc,
    };

    if (mainImageURL) {
      responseObj.image = mainImageURL;
    }

    res.status(201).json(responseObj);
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: error.message });
  }
};
// Get a single trademan by ID
const getTrademanProfileById = async (req, res) => {
  try {
    const profile = await TrademanSchema.findById(req.params.id)
      .populate("user")
      .exec();
    console.log(profile, "Trademan profile");
    if (!profile) {
      return res.status(404).json({ error: "profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrademanProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id, 'idiuytrewqlkjhgfds');
    console.log(req.files, "files");

    const existingContent = await TrademanSchema.findById(id);

    if (!existingContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    const {
      occupation,
      username,
      email,
      ratings,
      hourlyRate,
      description,
      location,
      lat,
      lng,
      phoneNumber,
      gigTitle,
      gigDescription,
    } = req.body;
    const parsedLat = Number(lat?.[1]);
    const parsedLng = Number(lng?.[1]);

    let mainImageURL = existingContent?.image;

    // Handle image updates
    if (req.file) {
      const mainImage = req.file;
      const mainImageResult = await cloudinary.uploader.upload(mainImage.path, {
        folder: "Assets",
      });
      mainImageURL = mainImageResult.secure_url;
    }

    // Handle gigImage1 update
    let gigImage1URL = existingContent?.gigImage1;
    if (req.files && req.files.gigImage1) {
      console.log(req.files, "enfijsidjds");
      const gigImage1 = req.files.gigImage1[0];
      const gigImage1Result = await cloudinary.uploader.upload(gigImage1.path, {
        folder: "Assets",
      });
      gigImage1URL = gigImage1Result.secure_url;
    }

    // Handle gigImage2 update
    let gigImage2URL = existingContent?.gigImage2;
    if (req.files && req.files.gigImage2) {
      const gigImage2 = req.files.gigImage2[0];
      const gigImage2Result = await cloudinary.uploader.upload(gigImage2.path, {
        folder: "Assets",
      });
      gigImage2URL = gigImage2Result.secure_url;
    }

    // Handle gigImage3 update
    let gigImage3URL = existingContent?.gigImage3;
    if (req.files && req.files.gigImage3) {
      const gigImage3 = req.files.gigImage3[0];
      const gigImage3Result = await cloudinary.uploader.upload(gigImage3.path, {
        folder: "Assets",
      });
      gigImage3URL = gigImage3Result.secure_url;
    }

    // Handle video update
    let videoURL = existingContent?.video;
    if (req.files && req.files.video) {
      console.log(req.files.video[0], "video file");
      const video = req.files.video[0];
      const videoResult = await cloudinary.uploader.upload(video.path, {
        folder: "Assets",
        resource_type: "video", // Ensure proper resource type for video uploads
      });
      videoURL = videoResult.secure_url;
    }

    const updateFields = {
      occupation: occupation || existingContent.occupation,
      username: username || existingContent.username,
      email: email || existingContent.email,
      ratings: ratings || existingContent.ratings,
      hourlyRate: hourlyRate || existingContent.hourlyRate,
      description: description || existingContent.description,
      location: location || existingContent.location,
      gigTitle: gigTitle || existingContent?.gigTitle,
      gigDescription: gigDescription || existingContent?.gigDescription,
      image: mainImageURL,
      gigImage1: gigImage1URL,
      gigImage2: gigImage2URL,
      gigImage3: gigImage3URL,
      video: videoURL,
      lat: parsedLat || existingContent.lat,
      lng: parsedLng || existingContent.lng,
      phoneNumber: phoneNumber || existingContent.phoneNumber,
    };

    const updatedContent = await TrademanSchema.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(500).json({ message: "Failed to update content" });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Get all trademans
const getAllTradesmenProfiles = async (req, res) => {
  try {
    const profiles = await TrademanSchema.find().populate("user");

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrademanProfileByEmail = async (req, res) => {
  const { email } = req.query;
  console.log(req.query, "req.query");
  try {
    const profile = await TrademanSchema.findOne({ email: email });
    if (!profile) {
      return res.status(404).json({ error: "profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a trademan by ID
const deleteTrademanProfile = async (req, res) => {
  try {
    const profile = await TrademanSchema.findByIdAndRemove(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "profile not found" });
    }
    res.status(200).json(profile);
    // console.log("Successfully deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allTradesMen = async (req, res) => {
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
    const profiles = await TrademanSchema.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchTrademan = async (req, res) => {
  console.log(req.query, "Search here ");
  try {
    const query = req.query;
    // console.log(query,"search")
    const searchQuery = {};
    // console.log(searchQuery, "searchQuery");

    // search by name
    if (query.location) {
      searchQuery.location = { $regex: new RegExp(query.location, "i") };
      console.log(searchQuery);
    }
    // search by gategory
    if (query.tradeType) {
      searchQuery.tradeType = { $regex: new RegExp(query.tradeType, "i") };
      console.log(searchQuery);
    }
    // search by price o
    if (query.minhourlyRate && query.maxhourlyRate) {
      searchQuery.hourlyRate = {
        $lte: parseFloat(query.maxhourlyRate),
        $gte: parseFloat(query.minhourlyRate),
      };
      console.log(searchQuery);
    }
    const results = await TrademanSchema.find(searchQuery).populate("user");
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
module.exports = {
  createTrademanProfile,
  updateTrademanProfile,
  getAllTradesmenProfiles,
  getTrademanProfileById,
  deleteTrademanProfile,
  getTrademanProfileByEmail,
  allTradesMen,
  searchTrademan,
};
