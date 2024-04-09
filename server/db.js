const mongoose = require("mongoose");
require('dotenv').config();

module.exports = {
    connectDB : async () => {
        try{
            await mongoose.connect(process.env.MONGODB);
            console.log("Database connected.");
        }catch(error){
            console.log("Database not connected.");
        }
    }
}