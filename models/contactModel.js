const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({



})

const ContactModel = mongoose.model('contacts', contactSchema);

module.exports = ContactModel;