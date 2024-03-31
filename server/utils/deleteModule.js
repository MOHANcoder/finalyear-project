const Module = require('../models/Module');
const deleteChapter = require('./deleteChapter');

module.exports = async (moduleId) => {
    const moduleToDelete = await Module.findById(moduleId);
    moduleToDelete.chapters.forEach(async ({_id}) => deleteChapter(_id));
    await Module.findByIdAndDelete(moduleId);
};