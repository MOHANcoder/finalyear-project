import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useFetch from '../src/hooks/useFetch';
import {useNavigate} from 'react-router-dom';

export default function Login({setIsAuthenticated}) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const navigate = useNavigate();
    const inputFieldStyles = {
        height: '100%',
        width: '100%',
        padding: '0 20px',
        margin: 0,
        border: '1px solid',
        boxSizing: 'border-box',
        fontSize: 'large',
        borderRadius: '5px'
    };

    const submitButtonStyles = {
        padding: '10px',
        margin: 0,
        backgroundColor: '#ba23f6',
        color: 'white',
        border: 'none'
    };

    const divStyles = {
        flexGrow: 0.3,
        width: '100%'
    };

    const [helperText, setHelperText] = useState({ name: '', email: '', password: '' });

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            height: '100%',
            width: '100%'
        }}>
            <div
                style={{
                    background: "url('../src/assets/banner.jpg') center/cover no-repeat",
                    flex: '1 1 0'
                }}
            ></div>
            <form
                style={{
                    flex: '1 1 0',
                    padding: isMobile ? '0.5rem 2rem' : '5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    rowGap: isMobile ? '20px' : '40px'
                }}
                onChange={(e) => {
                    const element = e.target;
                    if (element.name === "role") {
                        return;
                    }
                    const validators = {
                        name: (value) => {
                            if (!(/[\w]+/.test(value))) {
                                return "Name cannot contain special characters except underscore";
                            } else {
                                return "";
                            }
                        },
                        email: (value) => {
                            if (!(/^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value))) {
                                return "Not a valid email address";
                            } else {
                                return "";
                            }
                        },
                        password: (value) => {
                            if (!(/.{6,}/.test(value))) {
                                return "Password length atleast 6 chars";
                            } else {
                                return "";
                            }
                        }
                    };

                    setHelperText((previous) => {
                        return { ...previous, [element.name]: validators[element.name](element.value) };
                    });
                }}

                method='post'
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const data = await useFetch('/login', {
                            email: e.target.email.value,
                            password: e.target.password.value
                        },"POST");

                        if (data.error !== undefined) {
                            throw new Error(data.error.message);
                        }
                        setIsAuthenticated(true);
                    } catch (error) {
                        alert(error.message);
                    }
                    navigate('/');
                    navigate(0);
                }}
            >
                <div><h1>Login</h1></div>
                <div style={divStyles}>
                    <input type="text" name='email' style={inputFieldStyles} placeholder='Enter your email' required />
                    <div>{helperText['email']}</div>
                </div>
                <div style={divStyles}>
                    <input type="password" name="password" style={inputFieldStyles} placeholder='Enter your password' required />
                    <div>{helperText['password']}</div>
                </div>
                <input type="submit" value="LOGIN" style={submitButtonStyles} onMouseOver={
                    (e) => e.target.style.boxShadow = '0 0 6px 1px grey'
                }
                    onMouseLeave={
                        (e) => e.target.style.boxShadow = 'none'
                    }
                />
                <div>
                    Don't have an account? <a href="register">register</a>
                </div>
            </form>
        </div>
    );
}