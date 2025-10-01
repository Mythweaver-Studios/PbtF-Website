// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// --- Middleware ---
// Enable CORS for your React app
app.use(cors({ origin: 'http://localhost:3000' }));

// Allows the server to parse incoming JSON payloads
app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with /api/auth

// --- Server Startup ---
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});