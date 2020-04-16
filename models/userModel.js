// To create a model, we need a schema (which is like a constant format for our database)
const mongoose = require('mongoose');
const schema = mongoose.Schema;

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

// Creating a model
const UserModel = mongoose.model('users', userSchema);

// Exporting the model
module.exports = UserModel;


// Steps of creating a model
// 1. require mongoose, create a schema 
// 2. add fields into our schema format
// 3. create a model using mongoose.model