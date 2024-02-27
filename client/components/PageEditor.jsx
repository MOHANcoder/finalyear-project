import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import CourseEditorSideBar from './CourseEditorSideBar';
import '../styles/PageEditor.css';

export default function PageEditor() {

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const [value, setValue] = useState("");

    return (
        <div style={{
            display: 'flex'
        }}>
            <CourseEditorSideBar />
            <div style={{
                height: '94dvh',
                width: '100%',
                backgroundColor: 'white'
            }}>
                <div style={{
                    height:'95%',
                    border:'1px solid'
                }}>
                    <ReactQuill style={{
                        height: '90%'
                    }} modules={modules} theme="snow" onChange={setValue} placeholder="Content goes here..." />
                </div>
                <div className='bottom-ribbon' style={{
                    height: '50px',
                    border:'1px solid',
                    display:'flex',
                    alignItems:'center'
                }}>
                    <div>SAVE</div>
                </div>
            </div>
        </div>
    );
}