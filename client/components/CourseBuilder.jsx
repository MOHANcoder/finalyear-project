import { useState } from "react";
import ReactQuill from "react-quill";
import ModuleAccordian from "./ModuleAccordian";
import { Add } from "@mui/icons-material";

export default function CourseBuilder() {

    const inputFieldStyles = {
        // height: '70%',
        display: 'block',
        width: '90%',
        margin: 0,
        border: 'none',
        boxSizing: 'border-box',
        fontSize: 'large'
    };

    const divStyles = {
        // marginTop:'40px',
        height: 'max-content',
        width: '100%'
    };

    const handleChange = (e) => {
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
            // modules:(value) => {
            //     if(isNaN(parseInt(value))){
            //         return "Enter a valid number";
            //     }
            //     if(parseInt(value) <= 0){
            //         return "Enter a positive value";
            //     }
            //     return "";
            // }
        };

        setHelperText((previous) => {
            return { ...previous, [element.name]: validators[element.name](element.value) };
        });
    };

    const addModule = () => {
        setModules((pre) => [...pre,{name:"new Module",chapters:["new chapter"]}]);
    };

    const removeModule = (id) => {
        setModules((pre) => {
            return [...pre.slice(0, id), ...pre.slice(id + 1)];
        });
    };

    const [helperText, setHelperText] = useState({ name: '', modules: '' });
    const [courseSummary, setCourseSummary] = useState('');
    const [modules, setModules] = useState([{ name: 'Introduction', chapters: ['Chapter 1'] }]);

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '40px',
                height: '100%',
                boxSizing:'border-box',
                // backgroundColor:'grey',
                padding: '10px',
                alignItems: 'center',
                // justifyContent:'space-evenly'
            }}

            onSubmit={async (e) => {
                e.preventDefault();
            }}
        >
            <div style={divStyles}>
                <label>Course Name : </label>
                <input type="text" name="name" style={inputFieldStyles} onChange={handleChange} />
                <div>{helperText['name']}</div>
            </div>

            <div style={{ ...divStyles }}>
                <label>Course details : </label>
                <ReactQuill placeholder="Everything about your course...Overview of the course..." style={{
                    ...inputFieldStyles,
                    width: '100%'
                }} onChange={setCourseSummary} />
            </div>

            <div style={divStyles}>
                Click + to add a new Module :
                <div style={{
                    cursor: 'pointer',
                    boxShadow: '0px 0px 2px 1px grey',
                    margin: '10px 0px',
                    width: 'max-content'
                }} onClick={addModule}><Add /></div>
                {modules.map((m,i) => <ModuleAccordian key={i} name={m.name} editable={true} chapters={m.chapters}
                    detailsStyle={inputFieldStyles}
                    removeModule={removeModule}
                    id={i}
                />)}
            </div>
        </form>
    );
}