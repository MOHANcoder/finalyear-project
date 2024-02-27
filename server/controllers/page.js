const Page = require('../models/Page');

module.exports = {
    createPage : async (req,res,next) => {
        try{
            const {title} = req.body;
            const pages = await Page.insertMany({title});
            req.status(200).json({
                success:true,
                page:{
                    title,
                    _id:pages[0].title
                }
            });
        }catch(error){
            next(error);
        }
    }
};