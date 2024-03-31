import { useState } from "react";
import { Add, Delete, Done, Edit, ExpandLess, ExpandMore, Save } from "@mui/icons-material";

export default function AccordionItem({ title, content, isAlwaysEmpty,onClickHandler }) {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened(!isOpened);
    return (
        <div className="accordion-item" onClick={onClickHandler ?? (() => {})}>
            <div className="accordion-item-header">
                <div className="accordion-item-title">{title}</div>
                {!isAlwaysEmpty &&
                    <div className="accordion-item-header-options">
                        <div className="accordion-item-header-option" onClick={handleOpen}>
                            {!isOpened ? <ExpandMore /> : <ExpandLess />}
                        </div>
                    </div>}
            </div>
            <div className={`accordion-item-content ${isOpened ? 'accordion-item-content-open' : ''}`}>
                {content}
            </div>
        </div>
    );
}