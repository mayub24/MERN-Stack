// Once we create routing inside app.js that connects to this route, we need to add router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to homepage');
})


// Export the router
module.exports = router;