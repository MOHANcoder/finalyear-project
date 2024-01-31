const {Schema,model} = require("mongoose");

const OptionSchema = new Schema({
    textContent:String,
    imageUrl:String
});

const QuestionSchema = new Schema({
    questionType:String,
    questionString:{
        type:String,
        required:true
    },
    options:{
        type:[OptionSchema]
    }
});

module.exports = model('Question',QuestionSchema);