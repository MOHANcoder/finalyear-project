import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Accordion.css';
import AccordionItem from './AccordionItem';
import ModuleAccordionTitle from './ModuleAccordionTitle';
import ModuleAccordionContent from './ModuleAccordionContent';
import { courseModuleAdded, fetchCourse,saveToCloud } from '../src/features/course/courseSlice.js';
import Loader from './Loader.jsx';

export default function ModuleAccordion({ courseId }) {

    const dispatch = useDispatch();
    const dataStatus = useSelector(state => state.course.status);
    const modules = useSelector(state => state.course.data.modules);

    const addNewModule = () => {
        dispatch(courseModuleAdded('New Module'));
    };

    useEffect(() => {
        if (dataStatus == 'idle') {
            dispatch(fetchCourse({id:courseId}));
        }
    }, [dispatch, dataStatus, courseId]);

    if (dataStatus !== 'succeeded') {
        return <Loader />;
    }

    return (
        <div className="accordion">
            <button onClick={() => dispatch(saveToCloud())}>SAVE</button>
            <button onClick={addNewModule}>+</button>
            {Object.entries(modules).map(([id, module]) =>
                <AccordionItem
                    key={id}
                    title={
                        <ModuleAccordionTitle
                            defaultTitle={module.name}
                            id={id}
                            type={{ name: 'module' }}
                        />}
                    content={
                        <ModuleAccordionContent
                            moduleId={id}
                        />
                    }
                />)}
        </div>
    );
}