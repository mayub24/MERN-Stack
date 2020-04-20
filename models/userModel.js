// To create a model, we need a schema (which is like a constant format for our database)
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Importing bcrypt for encryption
const bcrypt = require('bcryptjs');

// Initializing the schema
const userSchema = new schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type: String,
        required: true
    },
    pass:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }
})

// Encrypting password
// pre means before saving
userSchema.pre("save", async function (next) {

    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashed = await bcrypt.hash(this.pass, salt);

    // Make this password = to the hashed value
    this.pass = hashed;

    // Move onto the next middleware
    next();

    console.log('Password has been hashed.');

});

// Creating a model
const UserModel = mongoose.model('users', userSchema);

// Exporting the model
module.exports = UserModel;


// Steps of creating a model
// 1. require mongoose, create a schema 
// 2. add fields into our schema format
// 3. create a model using mongoose.model