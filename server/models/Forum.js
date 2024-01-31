const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ForumSchema = new Schema({
    chats:{
        type:[{
            type:ObjectId,
            ref:'Chat'
        }]
    },
    polls:{
        type:[{
            type:ObjectId,
            ref:'Poll'
        }]
    }
});

module.exports = model('Forum',ForumSchema);
