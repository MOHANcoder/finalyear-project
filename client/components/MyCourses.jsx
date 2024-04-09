import { useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { Edit, Delete, Publish, RemoveRedEye, Unpublished } from '@mui/icons-material';
import useFetch from "../src/hooks/useFetch";

export default function MyCourses({ role }) {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const CourseListItem = ({ name, instructor, rating, price, summary, enrolledCount, thumbnail, _id, isPublished }) => {

        const deleteCourse = async () => {
            try {
                const { success, message } = await useFetch(`/mycourses/course/${_id}`, 'DELETE');
                if (success) {
                    alert(message);
                } else {
                    throw new Error(message);
                }
            } catch (error) {
                alert(error.message);
            }
            navigate('/mycourses');
            navigate(0);
        };


        const handlePublish = async () => {
            try {
                let action = 'publish';
                if (isPublished) {
                    action = 'unpublish';
                }
                const { success, message } = await useFetch(`/mycourses/${action}/${_id}`, {}, 'PUT');
                if (success) {
                    alert(message);
                    navigate(0);
                } else {
                    throw new Error(message);
                }
            } catch (error) {
                alert('Error occurred');
            }
        }

        return (<div style={{
            display: 'flex',
            height: '150px',
            width: '100%',
            columnGap: '20px',
            marginTop: '10px',
            padding: '10px',
            border: '1px solid',
            boxSizing: 'border-box'
        }}>
            <div style={{
                width: '20%',
                minWidth: '100px',
                height: '100%',
                background: `url(${thumbnail ? thumbnail : '../src/assets/banner.jpg'}) center/cover no-repeat`,
            }}>

            </div>
            <div style={{
                width: '65%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    width: '100%'
                }}><h5>{name}</h5></div>
                <div style={{
                    display: 'flex',
                    columnGap: '10px'
                }}>
                    {role === 'instructor' ? (
                        <>
                            <Link to={`/mycourses/build/${_id}`}><Edit /></Link>
                            <button onClick={deleteCourse}><Delete /></button>
                            <button onClick={handlePublish}>{isPublished ? <Unpublished /> : <Publish />}</button>
                        </>
                    ) : (
                        <>
                            view
                            <Link to={`/explore/view/${_id}`}><RemoveRedEye /></Link>
                        </>
                    )}
                </div>
            </div>
        </div>);
    }

    const fetchCourses = async () => {
        try {
            if (role === "student") {
                const data = await useFetch('/mycourses/enrolled');
                if (data.success) {
                    setCourses(data.data);
                }
            } else if (role === "instructor") {
                const data = await useFetch('/mycourses/created');
                if (data.success) {
                    setCourses(data.data);
                }
            }
        } catch (error) {
            setCourses([]);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            {role === "student" ? <div>
                <div>
                    <h2>{courses.length} Enrolled Courses</h2>
                </div>
                <div>
                    {courses.map((course) => <CourseListItem key={course._id} {...course} />)}
                </div>
            </div> : <div>
                <div>
                    <h2>{courses.length} Created Courses</h2>
                </div>
                <Link to="create" style={{
                    fontSize: 'xx-large',
                    display: 'block',
                    width: '50px',
                    borderRadius: '50%',
                    boxShadow: '0px 0px 8px 3px blueviolet',
                    textAlign: 'center',
                    height: '50px'
                }}>+</Link>
                <div>
                    {courses.map((course) => <CourseListItem key={course._id} {...course} />)}
                </div>
            </div>}
        </div>
    );
}