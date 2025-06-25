const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');

router.post('/', async (req, res) => {
    try {
        const { name, email, amount, cause } = req.body;

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Donation to ${cause} cause`,
                    },
                    unit_amount: Math.round(amount * 100), // Stripe uses cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
            metadata: {
                donor_name: name,
                donor_email: email,
                cause: cause
            }
        });

        // Save to database (even before payment is complete)
        const donation = new Donation({
            name,
            email,
            amount,
            cause,
            stripeSessionId: session.id,
            status: 'pending'
        });
        await donation.save();

        res.json({ success: true, url: session.url });
    } catch (err) {
        console.error('Payment error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;