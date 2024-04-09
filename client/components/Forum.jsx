import { Send } from '@mui/icons-material';
import '../styles/Forum.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../src/hooks/useFetch';
import Loader from './Loader';

export default function Forum() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState('');
    const [forum, setForum] = useState('');
    const [isMessagesLoaded,setIsMessagesLoaded] = useState(false);
    const [courseDetails,setCourseDetails] = useState({});
    const { id } = useParams();
    const chatsContainer = useRef(null);

    const findUserId = () => {
        const token = document.cookie.split(";").find(cookie => cookie.startsWith("token="));
        if (token !== undefined) {
            const payload = JSON.parse(atob((token.split('.')[1]).replace('-', '+').replace('_', '/')));
            if (payload) {
                setUserId(payload['userId']);
            }
        }
    }

    const fetchForumData = async () => {
        try {
            const { data } = await useFetch(`/forum/${id}`);
            setForum(data.forum._id);
            setChats(data.forum.chats);
            setIsMessagesLoaded(true);
            setCourseDetails(data.course);
            scrollDown();
        } catch (error) {
            console.log(error);
        }
    }

    const scrollDown = () => {
        if(chatsContainer.current){
            chatsContainer.current.scrollTop = chatsContainer.current.scrollHeight;
        }
    }

    const sendMessage = async () => {
        try {
            const data = await useFetch(`/forum/${forum}`, {
                textContent: message
            }, 'POST');
            if (data.success) {
                console.log(data.message);
            }
            await fetchForumData();
        } catch (error) {
            console.log(error);
        }
        setMessage('');
        scrollDown();
    }

    useEffect(() => {
        findUserId();
        fetchForumData();
        const fetchInterval = setInterval(fetchForumData,5000);
        return () => clearInterval(fetchInterval);
    }, []);

    if(!isMessagesLoaded){
        return <Loader/>
    }

    return (
        <>
            <section className="course-info">
                <h1>{courseDetails.name}</h1>
            </section>
            <section className="forum">
                <div className="chats-container" ref={chatsContainer}>
                    {chats.map((chat, i) => {
                        const date = new Date(chat.createdAt);
                        let dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours() > 12 ? (date.getHours() - 12) : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ?'AM' : 'PM'}`;
                        return <div className={`chat ${chat.sentBy._id === userId ? 'self' : 'others'}`} key={i}>{chat.textContent}<div className='send-time'>{dateString}</div><div className="sender-name">{chat.sentBy.name}</div></div>;
                    })}
                </div>
                <div className="chat-input-container">
                    <input type="text" placeholder='Write your Doubt....' className="chat-input" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button className="chat-send-button" onClick={sendMessage}><Send /></button>
                </div>
            </section>
        </>
    )
}