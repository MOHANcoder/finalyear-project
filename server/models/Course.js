const {Schema,model} = require("mongoose");

const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    thumbnail:{
        type:String
    }
},{
    timestamps:true
});

module.exports = model('Course',courseSchema);