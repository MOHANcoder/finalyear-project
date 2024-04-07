import { MenuRounded } from "@mui/icons-material";
import '../styles/NavigationBar.css';
import { Link,useLocation } from "react-router-dom";
import { useContext, createContext } from "react";

let context = createContext(null);

export const Menu = ({ icon, content, link ,isFooter=false,onClick }) => {
    const {collapsed,isBottomBar} = useContext(context);
    const location = useLocation();

    return (
        <div className={`icon-menu ${isBottomBar && 'icon-menu-bottom-bar'} ${isFooter ? 'footer-menu' : ''} ${(link !== "/" && location.pathname !== "/" && location.pathname.startsWith(link)) || (link === "/" && location.pathname === "/") ? 'active' : ''}`} onClick={onClick}>
            <Link to={link} className={`icon-menu-link ${isBottomBar && 'icon-menu-link-bottom-bar'}`}>
                <div className="icon-menu-icon">{icon}</div>
                {(isBottomBar || !collapsed) && <div className={`icon-menu-content ${collapsed ? 'icon-menu-content-collapsed' : ''}`}>{content}</div>}
            </Link>
        </div>
    );
}

export default function NavigationBar({ title, children, collapsed = false, isBottomBar = false, onClick }) {
    if (isBottomBar) {
        collapsed = true;
    }
    return (
        <nav className={`navbar ${isBottomBar && 'navbar-bottom-bar'} ${collapsed && !isBottomBar ? 'navbar-only-collapsed' : ''}`}>
            {(!isBottomBar) && (
                <header className="navbar-header" onClick={onClick}>
                    <div className="menu-icon">
                        <MenuRounded />
                    </div>
                    {!collapsed && (
                        <h1 className="navbar-heading">{title}</h1>
                    )}
                </header>
            )}
            <section className={`links-section ${isBottomBar ? 'links-section-bottom-bar' : ''}`}>
                <context.Provider value={{collapsed,isBottomBar}}>
                    {children}
                    <div className="menu-indicator"></div>
                </context.Provider>
            </section>
        </nav>
    )
}