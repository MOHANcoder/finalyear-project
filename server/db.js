const mongoose = require("mongoose");

module.exports = {
    connectDB : async () => {
        try{
            await mongoose.connect("mongodb://localhost:27017/mydb");
            console.log("Database connected.");
        }catch(error){
            console.log("Database not connected.");
        }
    }
}