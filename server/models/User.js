const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['student','instructor','admin']
    },
    enrolledCourses:[
        {
            type:Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    createdCourses:[
        {
            type:Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
},{
    timestamps:true
});

module.exports = model("User",UserSchema);