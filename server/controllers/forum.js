const Course = require('../models/Course');
const Forum = require('../models/Forum');

module.exports = {
    async fetchForumData(req,res,next){
        try{
            const {course_id} = req.params;
            const selectQuery = {
                path:'forum',
                populate:{
                    path:'chats',
                    populate:{
                        path:'sentBy',
                        select:'name'
                    }
                }
            };
            let course = await Course.findById(course_id).populate(selectQuery);
            if(course.forum === undefined){
                let forums = await Forum.insertMany({chats:[],polls:[]});
                course = await Course.findByIdAndUpdate(course_id,{$set:{forum:forums[0]._id}}).populate(selectQuery);
                console.log(forum);
            }
            res.status(200).json({
                success:true,
                data:{forum:course.forum,course:{name:course.name}}
            })
        }catch(error){
            next(error)
        }
    }
}