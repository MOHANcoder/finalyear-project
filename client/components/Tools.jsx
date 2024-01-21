import '../styles/Tools.css';
import Tool from './Tool';

import { Outlet } from 'react-router-dom';
export default function Tools({tools}) {
    return (
        <>
            <div className="tools-container">
                {tools.map((tool, i) =>
                    <Tool
                        key={i}
                        {...tool}
                    />)}
            </div>
            <Outlet />
        </>
    );
}