const express = require('express');

const secretKey = 'sk_test_51NO0eJITaueKIebSG63NCL9BrtB8DKE3LretZtwB3ErDzj68x0yVhCVBx0RnKq9ujIposYRpeus0VeOfSBssMrV400ajOwtvCb'
const stripe = require('stripe')(secretKey);
const Booking = require('../models/Bookings');

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const {data, totalAmount, bookingId} = req.body
    if(totalAmount < 90)
    {
      res.send('Amount must be greater than PKR 90')
      return;
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'PKR',
            product_data: {
              name: 'Tradesman Type: ' + data?.tradeType
            },
            unit_amount: totalAmount*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/browse-tradesman',
      cancel_url: `http://localhost:3000/tradesman/book-appointment/${data?._id}`,
    });
    const booking = await Booking.findOne({ _id: bookingId.bookingId });
    if (booking) {
      console.log(bookingId)
      booking.sessionId = session.id
      await booking.save();
      res.json({ id: session.id });
    }
  });


  module.exports = router;