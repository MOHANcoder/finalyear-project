const Chapter = require('../models/Chapter');
const Page = require('../models/Page');

module.exports = {
    createPage : async (req,res,next) => {
        try{
            const {title} = req.body;
            const pages = await Page.insertMany({title});
            res.status(200).json({
                success:true,
                page:{
                    title,
                    _id:pages[0].title
                }
            });
        }catch(error){
            next(error);
        }
    },
    async deletePage(req,res,next){
        try{
            const {page_id} = req.params;
            const {chapter_id} = req.body;
            await Page.findByIdAndDelete(page_id);
            await Chapter.findByIdAndUpdate(chapter_id,{$pull:{pages:page_id}});
            res.status(200).json({
                success:true,
                message:'Page Deleted Successfully'
            });
        }catch(error){
            next(error);
        }
    },
    async getPage(req,res,next){
        try{
            const {page_id} = req.params;
            const page = await Page.findById(page_id);
            res.status(200).json({
                success:true,
                page:{
                    id:page._id,
                    title:page.title,
                    content:page.content
                }
            });
        }catch(error){
            next(error);
        }
    },
    async updatePageContent(req,res,next){
        try{
            const {page_id} = req.params;
            const {content} = req.body;
            await Page.findByIdAndUpdate(page_id,{$set:{content}});
            res.status(200).json({
                success:true,
                message:'Page Updated Successfully'
            });
        }catch(error){
            next(error);
        }
    }
};