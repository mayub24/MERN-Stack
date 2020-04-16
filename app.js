const express = require('express');
const connectDB = require('./config/db');

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


// Instead of body parser, we can do
app.use(express.json({ extended: false }));


// Establishing Mongo Connection from db.js which is inside the config file
connectDB();

app.use('/', generalRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/contacts', contactRoute);

// Creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Connected to PORT: ${PORT}...`);
})