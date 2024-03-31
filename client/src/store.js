import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer.js';
import { saveCourseToLocalStorage } from './features/course/middleware.js';
import { savePageToLocalStorage } from './features/page/middleware.js'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveCourseToLocalStorage, savePageToLocalStorage),
    devTools: true
});

export default store;