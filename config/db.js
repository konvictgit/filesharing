require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on('error', (err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });

    connection.once('open', () => {
        console.log("MongoDB database connected successfully!");
    });
}

module.exports = connectDB;
