import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCourse,
    courseNameChanged,
    courseSummaryChanged,
    courseOverviewChanged,
    saveToCloud
} from '../src/features/course/courseSlice.js';
import Loader from './Loader.jsx';
import AlertBox from './AlertBox.jsx';

export default function CourseBuilder() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const dataStatus = useSelector(state => state.course.status);
    const courseName = useSelector(state => state.course.data.name);
    const courseSummary = useSelector(state => state.course.data.summary);
    const courseOverview = useSelector(state => state.course.data.overview);
    const courseActionMessage = useSelector(state => state.course.message);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCourse({id}));
    },[]);

    useEffect(() => {
        if (dataStatus == 'idle') {
            dispatch(fetchCourse({id}));
        }
    }, [dispatch, dataStatus, id]);

    const inputFieldStyles = {
        // height: '70%',
        display: 'block',
        width: '90%',
        margin: 0,
        border: 'none',
        boxSizing: 'border-box',
        fontSize: 'large'
    };

    const divStyles = {
        // marginTop:'40px',
        height: 'max-content',
        width: '100%'
    };

    const saveToDB = () => {
        dispatch(saveToCloud());
        navigate(`../mycourses/edit/${id}`);
    };

    if (dataStatus !== 'succeeded') {
        return <Loader />;
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '40px',
                height: '100%',
                boxSizing: 'border-box',
                // backgroundColor:'grey',
                padding: '10px',
                alignItems: 'center',
                // justifyContent:'space-evenly'
            }}
        >
            {courseActionMessage !== null && courseActionMessage.message !== null 
            && <AlertBox 
            message={courseActionMessage.message} 
            type={courseActionMessage.success?'success':'failed'}/>}
            <div style={divStyles}>
                <label>Course Name : </label>
                <input type="text" name="name" style={inputFieldStyles} value={courseName}
                    onChange={(e) => dispatch(courseNameChanged(e.target.value))} />
            </div>

            <div style={divStyles}>
                <label>Course Summary : </label>
                <br />
                <textarea style={inputFieldStyles} rows="4"
                    value={courseSummary}
                    onChange={
                        (e) => dispatch(courseSummaryChanged(e.target.value))
                    }></textarea>
            </div>

            <div style={{ ...divStyles }}>
                <label>Course Overview : </label>
                <ReactQuill placeholder="Everything about your course...Overview of the course..." style={{
                    ...inputFieldStyles,
                    width: '100%'
                }} value={courseOverview}
                onChange={(value) => dispatch(courseOverviewChanged(value))} />
            </div>

            <button onClick={saveToDB}>Go Next</button>
        </div>
    );
}