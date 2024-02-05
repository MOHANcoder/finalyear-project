const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ModuleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    chapters:{
        type:[{
            type:ObjectId,
            ref:'Chapter'
        }]
    },
    assessment:{
        type:ObjectId,
        ref:'Assessment'
    }
});

module.exports = model('Module',ModuleSchema);