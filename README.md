# NGO Payment Gateway Website

A secure donation platform for NGOs with Stripe integration.

## Features
- Responsive design (mobile-friendly)
- Stripe payment processing
- MongoDB donation tracking
- Campaign-specific donations

## Setup

### 1. Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Stripe account

### 2. Installation
```bash
git clone https://github.com/your-repo/ngo-website.git
cd ngo-website/server
npm install
```

### 3. Configuration
Create `.env` file:
```env
STRIPE_SECRET_KEY=sk_test_your_key
MONGODB_URI=mongodb://localhost:27017/ngo-donations
FRONTEND_URL=http://localhost:5500/client
```

### 4. Running
```bash
# Backend
cd server
node app.js

# Frontend
Open client/index.html in Live Server
```

## Testing Payments
Use Stripe test card:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Payment: Stripe