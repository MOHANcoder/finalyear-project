const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const PageSchema = new Schema({
    content:{
        type:Object,
        required:true
    },
    comments:[{
        type:ObjectId,
        ref:'Chat'
    }],
    xps:Int8Array
},{
    timestamps:true
});

module.exports = model('Page',PageSchema);