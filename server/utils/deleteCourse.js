const Course = require('../models/Course');
const deleteModule = require('./deleteModule');

module.exports = async (courseId) => {
    const courseToDelete = await Course.findById(courseId);
    courseToDelete.modules.forEach(async ({_id}) => deleteModule(_id));
    await Course.findByIdAndDelete(courseId);
}