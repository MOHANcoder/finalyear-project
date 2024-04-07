import { Send } from '@mui/icons-material';
import '../styles/Forum.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../src/hooks/useFetch';

export default function Forum() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState('');
    const [forum, setForum] = useState('');
    const { id } = useParams();

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
            setForum(data._id);
            setChats(data.chats);
        } catch (error) {
            console.log(error);
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
    }

    useEffect(() => {
        findUserId();
        fetchForumData();
    }, []);

    return (
        <>
            <section className="course-info">
                Welcome
            </section>
            <section className="forum">
                <div className="chats-container">
                    {chats.map((chat, i) => {
                        const date = new Date(chat.createdAt);
                        let dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours() > 12 ? (date.getHours() - 12) : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ?'AM' : 'PM'}`;
                        return <div className={`chat ${chat.sentBy === userId ? 'self' : 'others'}`} key={i}>{chat.textContent}<div>{dateString}</div></div>;
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