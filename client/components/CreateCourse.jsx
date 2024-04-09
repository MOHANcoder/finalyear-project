import { useState } from "react";
import useFetch from "../src/hooks/useFetch";

export default function CreateCourse() {

    const divStyles = {
        flexGrow: 2,
        width: '100%'
    };

    const inputFieldStyles = {
        height: '100%',
        width: '100%',
        padding: '0 20px',
        margin: 0,
        border: 'none',
        boxSizing: 'border-box',
        fontSize: 'large',
        minHeight: '40px'
    };

    const handleChange = (e) => {
        const element = e.target;
        const validators = {
            name: (value) => {
                if (!(/[\w]+/.test(value))) {
                    return "Name cannot contain special characters except underscore";
                } else {
                    return "";
                }
            },
            price: (value) => {
                if (isNaN(parseInt(value))) {
                    return "Enter a valid number";
                }
                if (parseInt(value) <= 0) {
                    return "Enter a positive value";
                }
                return "";
            }
        };

        setHelperText((previous) => {
            return { ...previous, [element.name]: validators[element.name](element.value) };
        });
    };

    const [courseType, setCourseType] = useState('free');
    const [thumbnail, setThumbnail] = useState('');
    const [helperText, setHelperText] = useState({ name: '', price: '' });
    const [passed, setPassed] = useState(true);

    return (
        <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }}>
            <section style={{
                boxShadow: '0px 0px 2px 1px grey',
                minWidth: '200px',
                maxWidth: '400px',
                borderRadius: '10px'
            }}>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Course Details</h2>
                    {!passed && <p style={{
                        color: 'red',
                        textAlign: 'center'
                    }}>Invalid values are entered.</p>}
                </div>
                <form
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        rowGap: '20px'
                    }}

                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!Object.values(helperText).every(value => value === '')) {
                            setPassed(false);
                            return;
                        }
                        setPassed(true);
                        try {
                            const data = await useFetch('/mycourses/create', {
                                name: e.target.name.value,
                                thumbnail: e.target.thumbnail.value,
                                price: parseInt(e.target.price.value),
                                summary: e.target.summary.value
                            },
                                "POST"
                            );
                            if (data.error !== undefined) {
                                throw new Error(data.error.message);
                            }
                            alert('Course Created');
                            window.location.href = "/mycourses";
                        } catch (error) {
                            alert(error.message);
                            window.location.reload();
                        }
                    }}
                >
                    <div style={divStyles}>
                        <label htmlFor="course_name">Course Name</label>

                        <input required type="text" id="course_name" name="name" style={inputFieldStyles} onChange={handleChange} />
                        <div>{helperText['name']}</div>
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_thumbnail">Course Thumbnail :</label>

                        <input required type="file" id="course_thumbnail" accept="image/*" style={inputFieldStyles} onChange={(e) => {
                            const fileInput = e.target;
                            const file = fileInput.files[0];
                            const reader = new FileReader();
                            reader.onload = () => {
                                setThumbnail(`data:${file.type};base64,${btoa(reader.result)}`);
                            }
                            reader.readAsBinaryString(file);
                        }} />
                        <input required type="text" style={{ visibility: 'hidden' }} defaultValue={thumbnail} name="thumbnail" />
                        {thumbnail && <img src={thumbnail} width="150px" height="100px" alt="course image" style={{ margin: '0 auto', display: 'block', border: '1px dashed' }} />}
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_type">Course Type :</label>

                        <select name="course_type" id="course_type" onChange={(e) => setCourseType(e.target.value)} style={inputFieldStyles}>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                        <div style={{ display: courseType === "paid" ? '' : 'none' }}>
                            <label htmlFor="price">Price :</label>
                            <br />
                            <input required type="text" name="price" id="price" style={inputFieldStyles} defaultValue={0} onChange={handleChange} />
                            <div>{helperText['price']}</div>
                        </div>
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_summary">Course summary :</label>

                        <textarea required name="summary" id="course_summary" style={inputFieldStyles} rows={5} placeholder="Course Summary"></textarea>
                    </div>
                    <div style={divStyles}>
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </section>
        </main>
    );
}

/**
 * 
 *  <section>
                <h1>Knowledge is power</h1>
                <p>Welcome to take a step to create a new course. <br />
                    Contribute to this platform by creating new course.
                    <br />
                    <strong>Note:</strong>
                    New courses are only published after approved by our team to ensure the quality of the course.
                </p>
            </section> 
 */