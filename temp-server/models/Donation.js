const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    cause: { type: String, required: true },
    stripeSessionId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);