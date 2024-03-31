const Course = require("../models/Course");
const User = require("../models/User");

module.exports = {
    async enroll ( req,res,next){
        try{
            const {course_id} = req.params;
            const userId = req.user.userId;
            await User.findByIdAndUpdate(userId,{$push:{enrolledCourses:course_id}});
            await Course.findByIdAndUpdate(course_id,{$push:{enrolledStudents:userId}});
            res.status(200).json({
                success:true,
                message:'Enrollment Succeeded'
            });
        }catch(error){
            next(error);
        }
    }
}