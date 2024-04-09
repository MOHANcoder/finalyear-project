const Course = require('../models/Course');
const Module = require('../models/Module');
const Chapter = require('../models/Chapter');
const Page = require('../models/Page');
const User = require('../models/User');

module.exports = {
    getCourseBuildDetails: async (req, res, next) => {
        try {
            const { course_id } = req.params;
            const course = await Course.findById(course_id).populate({
                path: 'modules',
                populate: {
                    path: 'chapters',
                    populate:{
                        path:'pages'
                    }
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
    deleteCourse: async (req, res, next) => {
        try {
            const { course_id } = req.params;
            const course = await Course.findById(course_id);
            course.enrolledStudents.forEach(async (id) => {
                await User.findByIdAndUpdate(id,{$pull:{enrolledCourses:course_id}});
            });
            await User.findByIdAndUpdate(course.createdBy,{$pull:{createdCourses:course_id}});
            await Course.findByIdAndDelete(course_id);
            res.status(200).json({
                success: true,
                message: "Course Deleted Permenantly"
            });
        } catch (error) {
            next(error);
        }
    },
    buildCourseStructure: async (req, res, next) => {
        try {
            const { id, name, thumbnail, summary, overview, modules } = req.body;
            const insertedModules = [];
            for (let [moduleId, module] of Object.entries(modules)) {
                const insertedChapters = [];
                const { name, chapters } = module;
                if (module.isNew) {
                    for (let [_, chapter] of Object.entries(chapters)) {
                        const { name, pages } = chapter;
                        const insertedPages = await Page.insertMany(Object.entries(pages).map(([_, page]) => ({ title: page.title })));
                        const insertedChapter = await Chapter.insertMany({ name, pages: insertedPages.map(({ _id }) => _id) });
                        insertedChapters.push(insertedChapter[0]._id);
                    }
                    const insertedModule = await Module.insertMany({name,chapters:insertedChapters});
                    insertedModules.push(insertedModule[0]._id);
                } else {
                    for (let [chapterId, chapter] of Object.entries(chapters)) {
                        const { name, pages } = chapter;
                        const insertedPages = [];
                        if (chapter.isNew) {
                            const insertedPages = await Page.insertMany(Object.entries(pages).map(([_, page]) => ({ title: page.title })));
                            const insertedChapter = await Chapter.insertMany({ name, pages: insertedPages.map(({ _id }) => _id) });
                            insertedChapters.push(insertedChapter[0]._id);
                        } else {
                            for (let [pageId, page] of Object.entries(pages)) {
                                if (page.isNew) {
                                    const insertedPage = await Page.insertMany({ title: page.title });
                                    insertedPages.push(insertedPage[0]._id)
                                }else{
                                    await Page.findByIdAndUpdate(pageId,{$set:{title:page.title}}); 
                                }
                            }
                            await Chapter.findByIdAndUpdate(chapterId,{$set:{name},$push:{pages:{$each:insertedPages}}});
                        }
                    }
                    await Module.findByIdAndUpdate(moduleId,{ $set:{name},$push:{ chapters:{$each:insertedChapters}}} );
                }
            }
            await Course.findByIdAndUpdate(id, {
                $set: {
                    name,
                    thumbnail,
                    summary,
                    overview
                },
                $push:{
                    modules:{
                        $each:insertedModules
                    }
                }
            });
            res.status(200).json({
                success: true,
                message: 'Course created successfully'
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    publishCourse: async(req,res,next) => {
        try{
            const {course_id} = req.params;
            await Course.findByIdAndUpdate(course_id,{$set:{isPublished:true}});
            res.status(200).json({
                success:true,
                message:"Course Published"
            })
        }catch(error){
            next(error);
        }
    },
    unPublishCourse: async(req,res,next) => {
        try{
            const {course_id} = req.params;
            await Course.findByIdAndUpdate(course_id,{$set:{isPublished:false}});
            res.status(200).json({
                success:true,
                message:"Course Unpublished"
            })
        }catch(error){
            next(error);
        }
    }
};