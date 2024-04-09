import { useEffect, useState } from 'react';
import useFetch from '../src/hooks/useFetch';
import '../styles/Profile.css';
import Loader from './Loader';
import AlertBox from './AlertBox';

export default function Profile() {
    const [profileData, setProfileData] = useState({});
    const [isProfileFetched, setIsProfileFetched] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const usefetch = useFetch;

    const removeAlert = () => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 2000);
    }

    const fetchProfileData = async () => {
        try {
            const { success, data } = await usefetch('/profile');
            if (success) {
                setProfileData(data);
                setIsProfileFetched(true);
            }
        } catch (error) {
            setErrorMessage({ type: 'failed', message: 'Cannot able to fetch' });
        }
        removeAlert();
    }

    const changeProfilePic = async (e) => {
        try {
            const fileInput = e.target;
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = async () => {
                let profilePicture = `data:${file.type};base64,${btoa(reader.result)}`;
                const { success, message } = await usefetch('/profile/pic', { profilePicture }, 'PUT');
                setErrorMessage({ type: success ? 'success' : 'failed', message });
                fetchProfileData();
            }
            reader.readAsBinaryString(file);
        } catch (error) {
            setErrorMessage({ type: 'failed', message: 'Error During Upload' });
        }
        removeAlert();
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <section className="profile">
            <section className="banner"></section>
            <div className="pic">
                <img src={profileData.profilePicture ?? `../src/assets/banner.jpg`} alt="" />
                <label className="edit-icon" htmlFor='profile-pic-input'>
                    <i className="fa-regular fa-pen-to-square" ></i>
                </label>
                <input type="file" accept='image/*' id='profile-pic-input' style={{ display: 'none' }} onChange={changeProfilePic} />
            </div>
            {isProfileFetched ? (
                <section className="info">
                    <h1>{profileData.name}</h1>
                    <h4><i className="fa-regular fa-envelope"></i>&nbsp;{profileData.email}</h4>
                    <div className="role-badge">{profileData.role}</div>
                    <div className="course-count">Courses {profileData.role === "instructor" ? "Created" : "Enrolled"} : {(profileData.role === "instructor" ? profileData.createdCourses : profileData.enrolledCourses)?.length || 0}</div>
                    <div className="doj">Joined on : {profileData.createdAt.substring(0, 10)}</div>
                </section>
            ) : (
                <div className="loader-container">
                    <Loader />
                </div>
            )}
            {errorMessage && <AlertBox {...errorMessage} />}
        </section>
    );
}