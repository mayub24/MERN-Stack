const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: true
            })

        console.log('Database Connectioned...');
    }
    catch (err) {
        console.log(`Error has occured in connection to database: ${err}`);
    }
}

module.exports = connectDB;