const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const PollSchema = new Schema({
    sentBy:{
        type:ObjectId,
        ref:'User'
    },
    options:[{
        type:String,
        votedBy:[{
            type:ObjectId,
            ref:'User'
        }]
    }]
});

module.exports = model('Poll',PollSchema);