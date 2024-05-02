const express = require("express");
const { authenticateJWT } = require('../middleware/authMiddleware');

const Booking = require("../models/Bookings");
const router = express.Router();


//BOOK APPOINTMENT
router.post("/book-appointment/:id", authenticateJWT, async function(req,res){
    try {
        const newBooking = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date: new Date(req.body.date),
            startTime: (req.body.startTime),
            endTime: (req.body.endTime),
            userId: req.user._id,
            tradesmanId: req.params.id,
            addInfo: req.body.addInfo,
            paymentStatus: 'Pending'
        };
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startTime = new Date(`1970-01-01T${newBooking.startTime}`);
        const endTime = new Date(`1970-01-01T${newBooking.endTime}`);
        if (startTime >= endTime) {
            return res.status(400).send('End time must be ahead of start time');
        }
        if (endTime - startTime < 3600000) {
            return res.status(400).send('Minimum difference between start time and end time must be 1 hour');
        }
        if (newBooking.date < today) {
            return res.status(400).send(`Date cannot be before today's date`);
        }
        const existingBookings = await Booking.find({
            tradesmanId: newBooking.tradesmanId,
            date: newBooking.date,
            $or: [
              {
                startTime: { $lt: newBooking.endTime },
                endTime: { $gt: newBooking.startTime }
              },
              {
                startTime: { $gte: newBooking.startTime, $lt: newBooking.endTime }
              },
              {
                endTime: { $gt: newBooking.startTime, $lte: newBooking.endTime }
              }
            ]
          });
        if (existingBookings.length > 0) {
            return res.status(400).send('Booking overlaps with existing bookings for this tradesman on this date.');
        }
        else {
            var booking = new Booking(newBooking)
            await booking.save();
            // res.status(200).send('Booking saved successfully');
            res.status(200).json({ bookingId: booking._id });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;