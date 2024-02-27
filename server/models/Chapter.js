const {Schema,model} = require("mongoose");
const {ObjectId} = Schema.Types;

const ChapterSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    pages:{
        type:[{
            type:ObjectId,
            ref:'Page'
        }]
    },
    assessment:{
        type:ObjectId,
        ref:'Assessment'
    },
    module:{
        type:ObjectId,
        ref:'Module'
    }
}, {
    timestamps: true
});

module.exports = model('Chapter',ChapterSchema);