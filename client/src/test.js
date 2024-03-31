import store from './store.js';
import { fetchCourse } from './features/course/courseSlice.js';

store.dispatch(fetchCourse('uigfu'));
console.log(store.getState());