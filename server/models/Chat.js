const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ChatSchema = new Schema({
    sentBy : {
        type:ObjectId,
        ref:'User',
        required:true
    },
    textContent:String,
    videoUrl:String,
    imageUrl:String
},{
    timestamps:true
});

module.exports = model('Chat',ChatSchema);