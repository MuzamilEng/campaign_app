const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/token");
const sendMail = require("./sendMail");

const generateOTP = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a random OTP
    const otp = generateOTP();

    // Save the OTP in the database
    await Token.findOneAndUpdate(
      { userId: user._id },
      { otp: otp },
      { upsert: true }
    );

    // Send the OTP to the user's email
    await sendMail(email, "Password Reset OTP", `Your OTP for password reset is: ${otp}`);

    res.status(200).json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the OTP is valid
    const token = await Token.findOne({ userId: user._id, otp });
    if (!token) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP token
    await Token.deleteOne({ userId: user._id });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { forgotPassword, resetPassword };
