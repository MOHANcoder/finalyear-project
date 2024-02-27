const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const ModuleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    chapters: [{
        type: ObjectId,
        ref: 'Chapter'
    }],
    assessment: {
        type: ObjectId,
        ref: 'Assessment'
    },
    course: {
        type: ObjectId,
        ref: 'Course'
    }
}, {
    timestamps: true
});

module.exports = model('Module', ModuleSchema);