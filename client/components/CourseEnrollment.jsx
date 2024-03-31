import { Link, useParams } from "react-router-dom";
import useFetch from "../src/hooks/useFetch";
import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";
import '../styles/CourseEnrollment.css';
import { Person } from "@mui/icons-material";
import AlertBox from "./AlertBox";

const CourseEnrollment = () => {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [author, setAuthor] = useState({});
    const [message, setMessage] = useState({ message: null, success: true });

    const fetchCourseDetails = async () => {
        const courseDetails = await useFetch(`/explore/${id}`);
        const authorDetails = await useFetch(`/explore/author/${id}`);
        setState(courseDetails.data);
        setAuthor(authorDetails.author);
    };

    const handleEnroll = async () => {
        try {
            const { success, message } = await useFetch(`/enroll/${id}`);
            setMessage({ message, success });
            setTimeout(() => {
                setMessage({ message: null, success: true });
            }, 4000);
        }catch(error){
            setMessage({ message:'Something went wrong', success:false });
            setTimeout(() => {
                setMessage({ message: null, success: true });
            }, 4000);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    return (
        <main className="course-details-container">
            {message.message !== null &&
                <AlertBox type={message.success ? 'success' : 'failed'} message={message.message} />
            }
            <div className="course-image" style={{
                height: '350px',
                background: `url(${state.thumbnail}) center/cover no-repeat`
            }}>
            </div>
            <h1>{state.name}</h1>
            <div className="course-overview" dangerouslySetInnerHTML={{ __html: state.overview }} />

            <div className="course-structure">
                <h2>Course Structure</h2>
                {Object.keys(state).length !== 0 && state.modules.map((module) =>
                    <AccordionItem
                        title={module.name}
                        key={module._id}
                        content={
                            module.chapters.map(chapter =>
                                <AccordionItem
                                    title={chapter.name}
                                    key={chapter._id}
                                    isAlwaysEmpty={true}
                                />
                            )
                        }
                    />
                )}
            </div>

            {
                Object.keys(author).length !== 0 && (
                    <div className="about-author-container">
                        <h2>About The Author</h2>
                        <div className="about-author">
                            <div className="author-img-name-container">
                                <div className="profile-image">
                                    {author.profileImage ? <img src={author.profileImage} alt="author profile" /> : <Person />}
                                </div>
                                <div className="author-name">
                                    {author.name}
                                </div>
                            </div>
                            <div className="author-created-courses-count">
                                Created Courses : {author.createdCourses.length}
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="enroll-button"><i>Want to enroll? <Link onClick={handleEnroll}>Enroll</Link></i></div>
        </main>
    );
};

export default CourseEnrollment;