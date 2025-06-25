// Add this at the VERY TOP of app.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY); // Debug line

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('sk_test_your_actual_key_here');
require('dotenv').config(); // Load environment variables
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY || "Key not found!");
console.log("Key Length:", process.env.STRIPE_SECRET_KEY?.length || 0);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../client')); // Serve frontend

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ngo-donations')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/donate', require('./routes/donate'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
