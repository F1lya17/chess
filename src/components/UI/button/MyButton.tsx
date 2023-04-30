import React from "react";
import classes from "./MyButton.module.css"

interface buttonProps {
    children: any
    onClick: any
}

const MyButton: React.FC<buttonProps> = function ({ children, onClick, ...props }) {
    return (
        <button {...props} onClick={onClick} className={classes.myBtn} style={{ 'marginLeft': '20px' }}>
            {children}
        </button>
    );
}

export default MyButton;