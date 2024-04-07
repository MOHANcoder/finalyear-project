const mongoose = require("mongoose");

module.exports = {
    connectDB : async () => {
        try{
            await mongoose.connect("mongodb://localhost:27017/mydb");
            // await mongoose.connect("mongodb+srv://mohan235689:fromindia123%402024@cluster0.5agswgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Database connected.");
        }catch(error){
            console.log("Database not connected.");
        }
    }
}