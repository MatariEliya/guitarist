import React from "react";
import './checkbox.css';

function Checkbox({className, onChange}) {
    return(
        <label className="checkbox-container">
            <input type="checkbox" className={`checkbox ${className}`} onChange={onChange} />
            <div className="checkmark"></div>
        </label>
    )
}

export default Checkbox;