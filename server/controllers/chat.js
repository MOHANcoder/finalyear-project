const Chat = require('../models/Chat');
const Course = require('../models/Course');
const Forum = require('../models/Forum');

module.exports = {
    async postMessage(req,res,next){
        try{
            const {forumId} = req.params;
            const {userId} = req.user;
            const {textContent} = req.body;
            const chat = await Chat.insertMany({sentBy:userId,textContent});
            await Forum.findByIdAndUpdate(forumId,{$push:{chats:chat[0]._id}});
            res.status(200).json({
                success:true,
                message:'Message Sent'
            })
        }catch(error){
            next(error);
        }
    }
}