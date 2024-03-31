import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useFetch from '../../hooks/useFetch.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { v4 as uuidv4 } from 'uuid';

const initialState = { status: 'idle', data: {}, error: null, message:null};

const modifyFetchedToReduxStore = (fetchedData) => {
    const modules = fetchedData.data.modules.reduce((prev, curr) => {
        const { _id, ...remaining } = curr;
        prev[curr._id] = {
            ...remaining,
            id: _id,
            chapters: curr.chapters.reduce((prev, curr) => {
                const { _id, ...remaining } = curr;
                prev[curr._id] = {
                    ...remaining,
                    id: _id,
                    pages: curr.pages.reduce((prev, curr) => {
                        const { _id, ...remaining } = curr;
                        prev[curr._id] = {
                            ...remaining,
                            id: _id,
                        };
                        return prev;
                    }, {})
                };
                return prev;
            }, {})
        };
        return prev;
    }, {});
    fetchedData.data.modules = modules;
}

export const fetchCourse = createAsyncThunk('course/fetchBuildDetails', async (payload) => {
    const {id,fromLocalOrUseDefault} = payload;
    const data = await useFetch(`/mycourses/build/${id}`);
    modifyFetchedToReduxStore(data);
    const [course, setCourse] = useLocalStorage(`course/${id}`, {
        initial: {
            fromLocalOrUseDefault:fromLocalOrUseDefault ?? true,
            data:data.data
        },
        dataType: 'JSON'
    });

    if (course.name === undefined) {
        if (data.success) {
            setCourse(data.data);
            return data.data;
        } else {
            setCourse({});
            return {};
        }
    }
    
    return course;
});

const sendMessage = (message,dispatch,success=true,delay=5000) => {
    let actionCreator;
    if(success){
        actionCreator = courseActionSuccessCaptured;
    }else{
        actionCreator = courseActionErrorCaptured;
    }
    dispatch(actionCreator(message));
    setTimeout(() => {
        dispatch(actionCreator(null));
    },delay);
};

export const saveToCloud = createAsyncThunk('course/saveTocloud',async (_,{getState,dispatch}) => {
    try{
        const {course} = getState();
        const {success} = await useFetch(`/mycourses/build/${course.data.id}`,course.data,'POST');
        if(success){
            sendMessage('Content Saved to cloud',dispatch);
            dispatch(fetchCourse({id:course.data.id,fromLocalOrUseDefault:false}));
        }else{
            sendMessage('Cannot able to save to cloud!',dispatch,false);
        }
    }catch(error){
        sendMessage('Cannot able to save to cloud!',dispatch,false);
    }
});

export const deleteModule = createAsyncThunk('course/courseModuleDeleted',async ({id},{getState,dispatch}) => {
    try{
        const {course} = getState();
        dispatch(courseModuleDeleted({id}));
        if(course.data.modules[id].isNew === undefined){
            const {success,message} = await useFetch(`/mycourses/module/${id}`,{course_id:course.data.id},'DELETE');
            sendMessage(message,dispatch,success);
        }else{
            sendMessage('Module Deleted',dispatch);
        }
    }catch(error){
        sendMessage('Cannot able to delete',dispatch,false);
    }
});

export const deleteChapter = createAsyncThunk('course/courseModuleChapterDeleted',async ({id,moduleId},{getState,dispatch}) => {
    try{
        const {course} = getState();
        dispatch(courseModuleChapterDeleted({id,moduleId}));
        if(course.data.modules[moduleId].chapters[id].isNew === undefined){
            const {success,message} = await useFetch(`/mycourses/chapter/${id}`,{module_id:moduleId},'DELETE');
            sendMessage(message,dispatch,success);
        }else{
            sendMessage('Chapter Deleted',dispatch);
        }
    }catch(error){
        sendMessage('Cannot able to delete',dispatch,false);
    }
});

export const deletePage = createAsyncThunk('course/courseModuleChapterDeleted',async ({id,chapterId,moduleId},{getState,dispatch}) => {
    try{
        const {course} = getState();
        dispatch(courseModulePageDeleted({id,chapterId,moduleId}));
        if(course.data.modules[moduleId].chapters[chapterId].pages[id].isNew === undefined){
            const {success,message} = await useFetch(`/mycourses/page/${id}`,{chapter_id:chapterId},'DELETE');
            sendMessage(message,dispatch,success);
        }else{
            sendMessage('Page Deleted',dispatch);
        }
    }catch(error){
        sendMessage('Cannot able to delete',dispatch,false);
    }
});

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        courseNameChanged(state, action) {
            state.data.name = action.payload;
        },
        courseThumbnailChanged(state, action) {
            state.data.thumbnail = action.payload;
        },
        courseSummaryChanged(state, action) {
            state.data.summary = action.payload;
        },
        courseOverviewChanged(state, action) {
            state.data.overview = action.payload;
        },
        courseModuleAdded(state, action) {
            const id = uuidv4();
            state.data.modules[id] = { name: action.payload, id, isNew: true ,chapters:{}};
        },
        courseModuleUpdated(state, action) {
            state.data.modules[action.payload.id].name = action.payload.name;
        },
        courseModuleDeleted(state, action) {
            delete state.data.modules[action.payload.id];
        },
        courseModuleChapterCreated(state, action) {
            const { moduleId, name } = action.payload;
            const id = uuidv4();
            state.data.modules[moduleId].chapters[id] = { name, id, isNew: true,pages:{} };
        },
        courseModuleChapterTitleUpdated(state, action) {
            const { moduleId, id,name } = action.payload;
            state.data.modules[moduleId].chapters[id].name = name;
        },
        courseModuleChapterDeleted(state, action) {
            const { moduleId, id } = action.payload;
            delete state.data.modules[moduleId].chapters[id];
        },
        courseModulePageCreated(state, action) {
            const { moduleId,chapterId, title } = action.payload;
            const id = uuidv4();
            state.data.modules[moduleId].chapters[chapterId].pages[id] = { title, id, isNew: true };
        },
        courseModulePageTitleUpdated(state, action) {
            const { moduleId,chapterId, id,title } = action.payload;
            state.data.modules[moduleId].chapters[chapterId].pages[id].title = title;
        },
        courseModulePageDeleted(state, action) {
            const { moduleId,chapterId, id } = action.payload;
            delete state.data.modules[moduleId].chapters[chapterId].pages[id];
        },
        courseActionSuccessCaptured(state,action){
            state.message = {message : action.payload,success:true};
        },
        courseActionErrorCaptured(state,action){
            state.message = {message : action.payload,success:false};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourse.pending, (state) => {
            state.status = 'Loading';
        })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCourse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
    }
})

export const { courseNameChanged,
    courseModuleAdded,
    courseModuleDeleted,
    courseModulePageCreated,
    courseModulePageDeleted,
    courseModulePageTitleUpdated,
    courseModuleUpdated,
    courseOverviewChanged,
    courseSummaryChanged,
    courseThumbnailChanged,
    courseModuleChapterCreated,
    courseModuleChapterDeleted,
    courseModuleChapterTitleUpdated,
    courseActionErrorCaptured,
    courseActionSuccessCaptured
} = courseSlice.actions;

export default courseSlice.reducer;