const Chapter = require('../models/Chapter');
const Page = require('../models/Page');

module.exports = async (chapterId) => {
    const chapterToDelete = await Chapter.findById(chapterId);
    chapterToDelete.pages.forEach(async ({ _id }) => await Page.findByIdAndDelete(_id));
    await Chapter.findByIdAndDelete(chapterId);
};