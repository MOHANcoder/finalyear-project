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
    },
    async getProfileInfo(req,res,next){
        try{
            const {userId} = req.user;
            const {name,email,createdCourses,enrolledCourses,role,createdAt,profilePicture} = await User.findById(userId);
            res.status(200).json({
                success:true,
                data:{
                    name,email,createdCourses,enrolledCourses,role,createdAt,profilePicture
                }
            });
        }catch(error){
            next(error);
        }
    },
    async changeProfilePic(req,res,next){
        try{
            const {profilePicture} = req.body;
            const {userId} = req.user;
            await User.findByIdAndUpdate(userId,{$set:{profilePicture}});
            res.status(200).json({
                success:true,
                message:'Profile Picture Changed'
            });
        }catch(error){
            next(error);
        }
    }
}