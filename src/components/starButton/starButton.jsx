import React from "react";
import './starButton.css';

import { StarSvg } from "../../assets/svg/svg";

function StarButton({starredChords, changeValue, className, disabled}) {
    return(
        <label className={`star-container ${className}`}>
            {disabled ? <input type="checkbox" checked={starredChords} disabled/> : <input type="checkbox" checked={starredChords} onChange={changeValue}/>}
            <StarSvg />
        </label>
    )
}

export default StarButton;