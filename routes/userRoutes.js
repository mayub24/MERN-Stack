// Bring in router from express
const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    res.send('Register a user')
})


// Export router
module.exports = router;