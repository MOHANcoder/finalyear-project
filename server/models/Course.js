const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        // required:true
    },
    enrolledStudents:{
        type:[{
            type:ObjectId,
            ref:'User'
        }]
    },
    modules:{
        type:[{
            type:ObjectId,
            ref:'Module'
        }],
        // required:true
    },
    forum:{
        type:ObjectId,
        ref:'Forum',
        // required:true
    },
    summary:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        // required:true
    }
},{
    timestamps:true
});

module.exports = model('Course',courseSchema);