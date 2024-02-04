import { useState } from "react";

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
        boxSizing:'border-box',
        fontSize:'large',
        minHeight:'40px'
    };

    const [courseType,setCourseType] = useState('free');
    const [thumbnail,setThumbnail] = useState('');

    return (
        <main style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100%'
        }}>
            <section style={{
                boxShadow:'0px 0px 2px 1px grey',
                minWidth:'200px',
                maxWidth:'400px',
                borderRadius:'10px'
            }}>
                <div>
                    <h2 style={{textAlign:'center'}}>Course Details</h2>
                </div>
                <form
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        rowGap: '20px'
                    }}
                    method="POST"
                    action="http://localhost:1000/mycourses/create"
                >
                    <div style={divStyles}>
                        <label htmlFor="course_name">Course Name</label>
                        
                        <input type="text" id="course_name" name="name" style={inputFieldStyles} />
                        <div></div>
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_thumbnail">Course Thumbnail :</label>
                        
                        <input type="file" id="course_thumbnail" accept="image/*" style={inputFieldStyles} onChange={(e)=>{
                            const fileInput = e.target;
                            const file = fileInput.files[0];
                            const reader = new FileReader();
                            reader.onload = () =>{
                                setThumbnail(`data:${file.type};base64,${btoa(reader.result)}`);
                            }
                            reader.readAsBinaryString(file);
                        }} />
                        <input type="text" style={{visibility:'hidden'}} value={thumbnail} name="thumbnail"  />
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_type">Course Type :</label>
                        
                        <select name="course_type" id="course_type" onChange={(e) => setCourseType(e.target.value)} style={inputFieldStyles}>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                        <div style={{display:courseType === "paid"?'':'none'}}>
                            <label htmlFor="price">Price :</label>
                            <br />
                            <input type="text" name="price" id="price" style={inputFieldStyles} defaultValue={0} />
                            <div></div>
                        </div>
                    </div>
                    <div style={divStyles}>
                        <label htmlFor="course_summary">Course summmary :</label>
                        
                        <textarea name="summary" id="course_summary" style={inputFieldStyles} rows={5} placeholder="Course Summary"></textarea>
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