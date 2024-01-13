const {summarize} = require("node-summary");

module.exports = {
    paraSummary : (req,res) => {
        const {title,content} = req.body;
        let summarizedContent;
        try{
            summarize(title,content,(error,summary) => {
                if(error){
                    throw new Error(`Error during summarization : ${error.message}`);
                }

                summarizedContent = summary;
            });
            return res.send({
                success : true,
                data : summarizedContent 
            });
        }catch(error){
            //Error handling
        }
    }
}