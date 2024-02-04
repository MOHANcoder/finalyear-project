const Course = require('../models/Course');
const User = require('../models/User');

module.exports = {
    getAllCourses: async (req, res, next) => {
        //Apply Algorithm to order the courses by the interests for Students
        try{
            const courses = await Course.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'instructor'
                    }
                },
                {
                    $addFields:{
                        instructor:'$instructor.name'
                    }
                },
                {
                    $project:{
                        createdBy:0
                    }
                }
            ])
            res.status(200).json(courses);
        }catch(error){
            next(error);
        }
    },
    createCourse : async (req,res,next) => {
        try{
            const {name,price,thumbnail,summary} = req.body;
            const {userId} = req.user;
            const course = new Course({name,price,thumbnail,summary,createdBy:userId});
            await course.save();
            await User.findByIdAndUpdate(userId,{$push:{createdCourses:course._id}});
            res.status(200).json({message:'Course Created Successfully.'})
        }catch(error){
            next(error);
        }
    },
    getAllEnrolledCourses : async (req,res,next) =>{
        try{
            const user = await User.findById(req.user.userId);
            res.status(200).json({success:true,data:user.enrolledCourses});
        }catch(error){
            next(error);
        }
    },
    getAllCreatedCourses : async (req,res,next) => {
        try{
            const createdCourses = await Course.find({createdBy:req.user.userId});
            res.status(200).json({success:true,data:createdCourses});
        }catch(error){
            next(error);
        }
    }
}