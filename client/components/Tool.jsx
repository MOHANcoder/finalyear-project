import {Link} from 'react-router-dom';
export default function Tool({icon,title,link}){
    return (
        <div className="tool">
            <div>
                {icon}
            </div>
            <Link to={link}>{title}</Link>
        </div>
    )
}