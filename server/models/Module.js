const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ModuleSchema = new Schema({
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