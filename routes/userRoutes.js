// Bring in router from express
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('config');

// Getting json web token secret from default.json
const jwtSecret = config.get('jwtSecret');

// Using express validator to send specific data when user signs up
const { check, validationResult } = require('express-validator');

// The validator should be used between the route(/) and the req/res
router.post('/',
    [
        check('firstName', 'first name is required').not().isEmpty(),
        check('lastName', 'last name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('pass', 'Please have atleast 8 characters').isLength({ min: 8 }),
        check('pass', 'Password must be between 8 and 16 characters').isLength({ max: 16 })
    ],
    (req, res) => {
        // req gets the database schema
        const errz = validationResult(req);

        const { firstName, lastName, pass, email } = req.body;

        if (errz.isEmpty()) // no errors
        {
            // Then add this data into our database

            const userData = { firstName, lastName, pass, email };

            // Creating new model
            const newUser = new User(userData);

            newUser.save()
                .then((registered) => {
                    res.json(registered);
                }).catch((err) => {
                    console.log(err.message);
                })


            // After user is saved, we want to generate a token using the userID

            // First creating the payload
            const payload =
            {
                user:
                {
                    id: newUser.id
                }
            }


            jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    throw err;
                }
                else {
                    res.json({ token });
                }
            })
        }
        else {
            return res.status(400).json({ errz: errz.array() });
        }
    })


// Export router
module.exports = router;