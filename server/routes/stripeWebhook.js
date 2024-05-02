const express = require('express');
const router = express.Router();
const secretKey = 'sk_test_51NO0eJITaueKIebSG63NCL9BrtB8DKE3LretZtwB3ErDzj68x0yVhCVBx0RnKq9ujIposYRpeus0VeOfSBssMrV400ajOwtvCb'
const stripe = require('stripe')(secretKey);
const Booking = require('../models/Bookings');


router.post('/webhook',express.raw({ type: 'application/json' }), async (req, res) => {
    // const endpointSecret = "whsec_18688cf5bc59c86e0b815de8b526ce401d2d0a408888d5b9e5870c34424fb2d7";
    const payload = req.body;
    console.log('Received Payload:', payload);
    const sig = req.headers['stripe-signature'];
    console.log('Received Signature:', sig);
  
    let event;
  
    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(payload, sig, process.env.API_KEY_WEBHOOK);
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const sessionID = session.id;
        const paymentStatus = session.payment_status
        console.log("Session ID: ",sessionID)
        console.log("Payment Status: ",paymentStatus)
  
        // Update payment status in booking schema
        await updatePaymentStatus(sessionID, paymentStatus);
  
        console.log('Payment status updated for session:', sessionID);
        break;
  
      default:
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
    }
  
    res.status(200).end();
  });

  const updatePaymentStatus = async (sessionID, paymentStatus) => {
    try {
      const booking = await Booking.findOne({ sessionId: sessionID });
      if (booking && paymentStatus === 'paid') {
        booking.paymentStatus = 'Approved';
        await booking.save();
        console.log('Payment status updated successfully');
      } else {
        console.error('Booking not found');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  
module.exports = router;