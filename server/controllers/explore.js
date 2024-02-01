const Course = require('../models/Course');

module.exports = {
    getAllCourses: async (req, res, next) => {
        //Apply Algorithm to order the courses by the interests for Students
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
    }
}