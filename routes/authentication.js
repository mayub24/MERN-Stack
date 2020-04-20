// Bringing in router
const express = require('express');
const router = express.Router();

// Getting required packages
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const jwtSecret = config.get('jwtSecret');

// Getting express-validator
const { check, validationResult } = require('express-validator');

// Authentication routes
// Getting /auth
router.get('/', (req, res) => {
    res.send('Get Logged in user');
})

// POSTING /auth
// When we log in, we need to do a couple steps
// 1. Check validation for email and password using express validator
// 2. Check if there are errors/if it is empty
// 3. if there are errors, return res.status(400), else use the findOne property of mongoDB to see if the email of the user exists.
// 4. if the email exists, compare passwords, else throw another err
router.post('/',
    [
        check('email', 'Invalid Email').not().isEmpty(),
        check('pass', 'Invalid Password').exists()
    ],
    async (req, res) => {

        const errz = validationResult(req);

        const { email, pass } = req.body;

        if (!errz.isEmpty()) {
            // Meaning we have errors
            return res.status(400).json({ errz: errz.array() });
        }
        else {
            try {
                const exists = await User.findOne({ email });

                if (!exists) {
                    return res.status(400).json({ msg: 'No user exists with that email!' });
                }

                const isMatch = await bcrypt.compare(pass, exists.pass);

                if (!isMatch) {
                    return res.status(400).json({ msg: 'Passwords dont match' });
                }

                const payload =
                {
                    user:
                    {
                        id: exists.id
                    }
                }

                // Getting a JWT token
                jwt.sign(payload, jwtSecret, { expiresIn: 3000 }, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log('Passwords match');
                        res.send({ token });
                    }

                })


            }
            catch (err) {
                console.log(err);
            }


        }

    })



// Exporting router
module.exports = router;