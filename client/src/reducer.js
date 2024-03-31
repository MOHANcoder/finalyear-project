import { combineReducers } from '@reduxjs/toolkit';
import courseReducer from '../src/features/course/courseSlice.js';
import pageReducer from './features/page/pageSlice.js';

const rootReducer = combineReducers({
    course:courseReducer,
    page:pageReducer
});

export default rootReducer;