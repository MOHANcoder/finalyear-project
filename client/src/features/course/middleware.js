export const saveCourseToLocalStorage = store => next => action => {
    const result = next(action);
    const {course} = store.getState();
    if(action.type.startsWith('course/') && course.data.id !== undefined){
        localStorage.setItem(`course/${course.data.id}`,JSON.stringify(course.data));
    }
    return result;
}