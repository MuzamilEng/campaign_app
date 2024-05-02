const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tradesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Trademan" },
    name: String,
    email: String,
    phone: String,
    date: Date,
    startTime: String,
    endTime: String,
    addInfo: String,
    paymentStatus: String,
    sessionId: String
},
{ timestamps: true }
);
const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;