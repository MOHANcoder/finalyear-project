const Course = require('../models/Course');
const Module = require('../models/Module');
const Chapter = require('../models/Chapter');

module.exports = {
    getCourseBuildDetails: async (req, res, next) => {
        try {
            const { course_id } = req.params;
            const course = await Course.findById(course_id).populate({
                path: 'modules',
                populate: {
                    path: 'chapters'
                }
            });
            res.status(200).json({
                success: true,
                data: {
                    id: course_id,
                    name: course.name,
                    thumbnail: course.thumbnail,
                    summary: course.summary,
                    overview: course.overview,
                    modules: course.modules
                }
            })
        } catch (error) {
            next(error);
        }
    },

    buildCourseStructure: async (req, res, next) => {
        try {
            const { course_id } = req.params;
            const courseDetails = req.body;
            const courseModules = [];

            for (let module of courseDetails.modules) {
                let moduleId;
                if (module._id === undefined && !module.isRemoved) {
                    moduleId = await Module.insertMany({ name: module.name, course: course_id });
                    moduleId = moduleId[0]._id;
                    courseModules.push(moduleId);
                } else if(module._id !== undefined && !module.isRemoved){
                    moduleId = await Module.findByIdAndUpdate(module._id, { $set: { name: module.name, course: course_id } });
                    moduleId = moduleId._id;
                    courseModules.push(moduleId);
                }else{
                    await Module.findByIdAndDelete(module._id);
                    module.chapters.map(async ({_id}) => await Chapter.findByIdAndDelete(_id));
                    continue;
                }
                
                const newChapters = await Chapter.insertMany(
                    module.chapters.filter(chapter => chapter._id === undefined).map(chapter => ({
                        name: chapter.name,
                        module: moduleId
                    }))
                );

                const updatedChapters = [];

                for(let chapter of module.chapters){
                    if(chapter._id !== undefined && !chapter.isRemoved){
                        await Chapter.findByIdAndUpdate(chapter._id, {
                            $set: ({
                                name: chapter.name,
                                module: moduleId
                            })
                        })
                        updatedChapters.push(chapter._id);
                    }else{
                        await Chapter.findByIdAndDelete(chapter._id);
                    }
                }

                if (newChapters.length > 0) {
                    await Module.findByIdAndUpdate(moduleId, {
                        $set: {
                            chapters: newChapters.map(chapter => chapter._id)
                        }
                    });
                }
            }

            await Course.findByIdAndUpdate(course_id, {
                $set: {
                    summary: courseDetails.summary,
                    overview: courseDetails.overview,
                    name: courseDetails.name,
                    modules: courseModules
                }
            });
            res.status(200).json({
                success: true,
                message: 'Course created successfully'
            });
        } catch (error) {
            next(error);
        }
    },
    deleteCourse : async (req,res,next) => {
        try{
            const {course_id} = req.params; 
            await Course.findByIdAndDelete(course_id);
            res.status(200).json({
                success:true,
                message:"Course Deleted Permenantly"
            });
        }catch(error){
            next(error);
        }
    }
};