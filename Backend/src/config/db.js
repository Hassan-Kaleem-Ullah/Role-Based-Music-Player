const { config } = require('dotenv');
const mongoose = require('mongoose');

async function connectDB() {
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB has connected to server');
        

    } catch (error) {

        console.log(error);
    }
    
}

module.exports = connectDB;