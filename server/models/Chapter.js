const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ChapterSchema = new Schema({
    pages:{
        type:[{
            type:ObjectId,
            ref:'Page'
        }]
    },
    assessment:{
        type:ObjectId,
        ref:'Assessment'
    }
});

model.exports = model('Chapter',ChapterSchema);