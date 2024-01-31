const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const AssessmentSchema = new Schema({
    questions:{
        type:[{
            type:ObjectId,
            ref:'Question'
        }]
    },
    xps:Int8Array
});

module.exports = model('Assessment',AssessmentSchema);