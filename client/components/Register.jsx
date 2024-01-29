import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
//Register
export default function Register() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const inputFieldStyles = {
        height: '100%',
        width: '100%',
        padding: '0 20px',
        margin: 0,
        border: 'none',
        boxSizing:'border-box',
        fontSize:'large'
    };

    const submitButtonStyles = {
        padding: '10px',
        margin: 0,
        backgroundColor:'#ba23f6',
        color:'white',
        border:'none'
    };

    const divStyles = {
        flexGrow:0.3,
        width:'100%'
    };

    const [helperText,setHelperText] = useState({name:'',email:'',password:''});

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
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    alignItems:'center',
                    rowGap:isMobile? '20px' : '40px'
                }}
                onChange={(e) => {
                    const element = e.target;
                    if(element.name === "role"){
                        return;
                    }
                    const validators = {
                        name:(value) => {
                            if(!(/[\w]+/.test(value))){
                                return "Name cannot contain special characters except underscore"; 
                            }else{
                                return "";
                            }
                        },
                        email:(value) => {
                            if(!value){
                                return "Not a valid email address";
                            }else{
                                return "";
                            }
                        },
                        password:(value) => {
                            if(!(/.{6,}/.test(value))){
                                return "Password length atleast 6 chars";
                            }else{
                                return "";
                            }
                        }
                    };

                    setHelperText((previous) => {
                        return {...previous,[element.name]:validators[element.name](element.value)};
                    });
                }}
                
                method='post'
                action='http://localhost:1000/register'
            >
                <div><h1>REGISTER</h1></div>
                <div style={divStyles}>
                    <input type="text" name='name' style={inputFieldStyles} placeholder='Enter your name' required />
                    <div>{helperText['name']}</div>
                </div>
                <div style={divStyles}>
                    <input type="text" name='email' style={inputFieldStyles} placeholder='Enter your email' required />
                    <div>{helperText['email']}</div>
                </div>
                <div style={divStyles}>
                    <input type="password" name="password" style={inputFieldStyles} placeholder='Enter your password' required />
                    <div>{helperText['password']}</div>
                </div>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        padding: '0 20px',
                        ...divStyles,
                        boxSizing:'border-box'
                    }}
                >
                    <label htmlFor="role" style={{flex:'1.5',fontSize:'large'}}>Select Your Role : </label>
                    <select name="role" id='role' style={{flex:'1'}} required>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div>
                <input type="submit" value="REGISTER" style={submitButtonStyles} onMouseOver={
                    (e) => e.target.style.boxShadow = '0 0 6px 1px grey'
                    }
                    onMouseLeave={
                        (e) => e.target.style.boxShadow = 'none'
                    }    
                />
                <div>
                    Already have an account? <a href="login">Login</a>
                </div>
            </form>
        </div>
    );
}