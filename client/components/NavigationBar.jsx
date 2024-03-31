import { MenuRounded } from "@mui/icons-material";
import '../styles/NavigationBar.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const Menu = ({ icon, content, link, collapsed, isBottomBar }) => {
    return (
        <div className={`icon-menu ${isBottomBar && 'icon-menu-bottom-bar'}`}>
            <a href={link} className={`icon-menu-link ${isBottomBar && 'icon-menu-link-bottom-bar'}`}>
                <div className="icon-menu-icon">{icon}</div>
                {(isBottomBar || !collapsed) && <div className="icon-menu-content">{content}</div>}
            </a>
        </div>
    );
}

export default function NavigationBar({ title, links, collapsed, isBottomBar }) {
    if (isBottomBar) {
        collapsed = true;
    }
    const [isCollapsed, setIsCollapsed] = useState(collapsed ?? false);
    const handleCollapse = () => setIsCollapsed(!isCollapsed);
    return (
        <nav className={`navbar ${isBottomBar && 'navbar-bottom-bar'} ${isCollapsed ? 'navbar-only-collapsed' : ''}`}>
            {(!isBottomBar) && (
                <header className="navbar-header">
                    <div className="menu-icon" onClick={handleCollapse}>
                            <MenuRounded />
                        </div>
                    {!isCollapsed && (
                        <h1 className="navbar-heading">{title}</h1>  
                    )}
                </header>
            )}
            <section className={`links-section-${isBottomBar && 'bottom-bar'}`}>
                {links.map(link => <Menu key={link} {...link} collapsed={isCollapsed} isBottomBar={isBottomBar} />)}
            </section>
        </nav>
    )
}