// Bring in router from express
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


router.post('/', (req, res) => {
    res.send(req.body)
})


// Export router
module.exports = router;