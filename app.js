const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes 
const generalRoutes = require('./routes/generalRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authentication');
const contactRoute = require('./routes/contacts');

// Getting dotenv so that we can create environment variables
require('dotenv').config()

const app = express();


// Using the app variable to create static folders, body parser and other thing
app.use(express.static("public"));


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', generalRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/contacts', contactRoute);

// Creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Connected to PORT: ${PORT}...`);
})