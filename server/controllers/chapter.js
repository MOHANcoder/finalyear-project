const Module = require('../models/Module');
const deleteChapterWithItsContent = require('../utils/deleteChapter');

module.exports = {
    deleteChapter : async (req, res, next) => {
        try{
            const { chapter_id } = req.params;
            const { module_id } = req.body;
            deleteChapterWithItsContent(chapter_id);
            await Module.findByIdAndUpdate(module_id,{$pull:{chapters:chapter_id}});
            res.status(200).json({
                success: true,
                message: 'Chapter deleted successfully'
            });
        }catch(error){
            next(error);
        }
    }
}