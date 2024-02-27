const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const PageSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    comments:[{
        type:ObjectId,
        ref:'Chat'
    }],
    xps:Number
},{
    timestamps:true
});

module.exports = model('Page',PageSchema);