// server/routes/auth.js
const express = require('express');
const router = express.Router();

// @route   GET /api/auth/test
// @desc    A test route to ensure the auth router is working
// @access  Public
router.get('/test', (req, res) => {
    res.json({ msg: 'Auth route is working!' });
});

// We will add the actual Discord login, callback, etc. routes here later.

module.exports = router;