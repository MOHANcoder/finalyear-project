import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function MyCourses({ role }) {
    const [courses, setCourses] = useState([]);
    
    const CourseListItem = ({name, instructor, rating, price, summary, enrolledCount,thumbnail}) =>{
        return (<div style={{
            display:'flex',
            height:'100px',
            width:'100%',
            columnGap:'20px',
            marginTop:'10px'
        }}>
            <div style={{
                width:'100px',
                height:'100%',
                background:`url(${thumbnail ? thumbnail :'../src/assets/banner.jpg'}) center/cover no-repeat`,
            }}>

            </div>
            <div style={{
                width:'50%'
            }}>
                <div>{name}</div>
                <div style={{
                    display:'flex',
                    columnGap:'10px'
                }}>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Publish</button>
                </div>
            </div>
        </div>);
    }

    const fetchCourses = async () => {
        try {
            if (role === "student") {
                const res = await fetch('http://localhost:1000/mycourses/enrolled', {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setCourses(data.data);
                }
            } else if (role === "instructor") {
                const res = await fetch('http://localhost:1000/mycourses/created', {
                    credentials: 'include'
                });
                const data = await res.json();
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
                <h2>{courses.length} Enrolled Courses</h2>
            </div> : <div>
                <h2>{courses.length} Created Courses</h2>
                <Link to="create" style={{
                    fontSize: 'xx-large',
                    display: 'block',
                    width: '50px',
                    borderRadius: '50%',
                    boxShadow: '0px 0px 8px 3px blueviolet',
                    textAlign: 'center',
                    height:'50px'
                }}>+</Link>
                <div>
                    {courses.map(course => <CourseListItem {...course}/>)}
                </div>
            </div>}
        </div>
    );
}