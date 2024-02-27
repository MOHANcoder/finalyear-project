import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import ModuleAccordion from "./ModuleAccordion";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";

export default function CourseBuilder() {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [courseSummary, setCourseSummary] = useState('');
    const [courseOverview, setCourseOverview] = useState('');
    const [modules, setModules] = useState([]);

    const fetchCourseBuildDetails = async () => {
        try {
            const response = await fetch(`http://localhost:1000/mycourses/build/${id}`, {
                credentials: 'include'
            });
            const { success, data } = await response.json();
            if (success) {
                setName(data.name);
                setCourseSummary(data.summary);
                setCourseOverview(data.overview);
                if (data.modules.length !== 0) {
                    setModules(data.modules.map(module => ({
                        name: module.name,
                        id: module._id,
                        chapters: module.chapters.map(chapter => ({
                            chapter: chapter.name,
                            editable: false,
                            id: chapter._id,
                            isRemoved: false
                        })),
                        isRemoved: false
                    })));
                }
            } else {
                throw new Error('Course Not found');
            }
        } catch (error) {
            alert(error.message);
            window.location.href = 'http://localhost:5173/mycourses/';
        }
    }

    useEffect(() => {
        fetchCourseBuildDetails();
    }, []);

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

    const addModule = () => {
        setModules((pre) => [...pre, { name: "new Module" + pre.length, chapters: [], isRemoved: false }]);
    };

    const removeModule = (id) => {
        setModules((pre) => {
            if(pre[id].id === undefined){
                return [...pre.slice(0,id),...pre.slice(id+1)];
            }
            const copiedArray = [...pre];
            copiedArray[id]['isRemoved'] = true;
            return copiedArray;
        });
    };

    const updateModule = (id, module) => {
        setModules((pre) => {
            const copiedArray = [...pre];
            copiedArray[id].name = module.name;
            copiedArray[id].chapters = module.chapters;
            return copiedArray;
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '40px',
                height: '100%',
                boxSizing: 'border-box',
                // backgroundColor:'grey',
                padding: '10px',
                alignItems: 'center',
                // justifyContent:'space-evenly'
            }}
        >
            <div style={divStyles}>
                <label>Course Name : </label>
                <input type="text" name="name" style={inputFieldStyles} value={name} onChange={setName} />
            </div>

            <div style={divStyles}>
                <label>Course Summary : </label>
                <br />
                <textarea style={inputFieldStyles} rows="4" onChange={
                    (e) => {
                        setCourseSummary(e.target.value);
                    }
                } value={courseSummary}></textarea>
            </div>

            <div style={{ ...divStyles }}>
                <label>Course Overview : </label>
                <ReactQuill placeholder="Everything about your course...Overview of the course..." style={{
                    ...inputFieldStyles,
                    width: '100%'
                }} value={courseOverview} onChange={setCourseOverview} />
            </div>

            <div style={divStyles}>
                Click + to add a new Module :
                <div style={{
                    cursor: 'pointer',
                    boxShadow: '0px 0px 2px 1px grey',
                    margin: '10px 0px',
                    width: 'max-content'
                }} onClick={addModule}><Add /></div>
                {modules.map((m, i) => m.isRemoved ? '' : <ModuleAccordion key={m.id ?? m.name + Date.now()} warn={false} name={m.name} editable={false} chapters={m.chapters}
                    detailsStyle={inputFieldStyles}
                    removeModule={removeModule}
                    updateModule={updateModule}
                    id={i}
                />)}
            </div>

            <button onClick={
                async () => {
                    const data = {
                        name,
                        summary: courseSummary,
                        overview: courseOverview,
                        modules: modules.map(module => ({
                            name: module.name,
                            _id: module.id,
                            isRemoved: module.isRemoved,
                            chapters: module.chapters.map((
                                { chapter, id, isRemoved }) => ({
                                    name: chapter,
                                    _id: id,
                                    isRemoved
                                }
                            ))
                        }))
                    };

                    try {
                        const response = await fetch(`http://localhost:1000/mycourses/build/${id}`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });

                        const { success, message } = await response.json();
                        if (success) {
                            alert(message);
                            window.location.href = `http://localhost:5173/mycourses/edit/${id}`;
                        }
                    } catch (error) {
                        alert("some error occurred.");
                        window.location.reload();
                    }
                }
            }>gO NExT</button>
        </div>
    );
}