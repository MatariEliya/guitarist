import React from "react";
import "./checkbox.css";

import { CheckboxSvg } from "../../assets/svg/svg";


function Checkbox({checked, onChange}) {
    return (
        <label className="ios-checkbox green">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <div className="checkbox-wrapper">
                <div className="checkbox-bg"></div>
                <CheckboxSvg/>
            </div>
        </label>
    );
}

export default Checkbox;