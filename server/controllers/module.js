const Course = require('../models/Course');
const Module = require('../models/Module');
const deleteModuleWithItsContent = require('../utils/deleteModule');

module.exports = {
    async createModule(req,res,next){
        try{
            const {name,courseId} = req.body;
            const module = await Module.insertMany({name,course:courseId});
            res.status(200).json({success:true,data:{
                ...module
            }});
        }catch(error){
            next(error);
        }
    },
    async updateModule(req,res,next){
        try{
            const {name,id} = req.body;
            const module = await Module.findByIdAndUpdate(id,{$set:{name}});
            res.status(200).json({success:true,data:{
                ...module
            }});
        }catch(error){
            next(error);
        }
    },
    async deleteModule(req,res,next){
        try{
            const {module_id} = req.params;
            const {course_id} = req.body;
            deleteModuleWithItsContent(module_id);
            await Course.findByIdAndUpdate(course_id,{$pull:{modules:module_id}});
            res.status(200).json({
                success:true,
                message:'Module deleted Successfully'
            });
        }catch(error){
            next(error);
        }
    }
}