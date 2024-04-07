const Course = require('../models/Course');
const Forum = require('../models/Forum');

module.exports = {
    async fetchForumData(req,res,next){
        try{
            const {course_id} = req.params;
            let course = await Course.findById(course_id).populate({
                path:'forum',
                populate:{
                    path:'chats'
                }
            });
            if(course.forum === undefined){
                let forums = await Forum.insertMany({chats:[chat[0]._id],polls:[]});
                let course = await Course.findByIdAndUpdate(course_id,{$set:{forum:forums[0]._id}}).populate({
                    path:'forum',
                    populate:{
                        path:'chats'
                    }
                });
            }
            res.status(200).json({
                success:true,
                data:course.forum
            })
        }catch(error){
            next(error)
        }
    }
}