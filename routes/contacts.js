// Getting router
const express = require('express');
const router = express.Router();

// Private
router.get('/', (req, res) => {
    res.send('Get all contacts');
})

// Private
// Posting contact = adding a new contact
router.post('/', (req, res) => {
    res.send('Add Contact')
})

// For puts we need to use :id
router.put('/:id', (req, res) => {
    res.send('Update contact');
})

// For delete, we also need :id
router.delete('/:id', (req, res) => {
    res.send('User has been deleted...')
})


// Exporting router
module.exports = router;