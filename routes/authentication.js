// Bringing in router
const express = require('express');
const router = express.Router();

// Authentication routes
// Getting /auth
router.get('/', (req, res) => {
    res.send('Get Logged in user');
})

// POSTING /auth
router.post('/', (req, res) => {
    res.send('User is logged in');
})



// Exporting router
module.exports = router;