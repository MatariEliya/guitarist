import React from "react";
import { useState } from "react";
import './textField.css';

function TextField({type, text, icon, className}) {
    const [showPassword, setShowPassword] = useState(false);
    if (type != "password" || showPassword) {
        type = "text";
    }
    return(
        <div className="textFieldContainer">
            <input placeholder={text} type={type} name="text" className={`input ${className}`}/>
            {showPassword || type === "password" ?
                <button 
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="gray"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                        {!showPassword && <line x1="3" y1="3" x2="21" y2="21"/>}
                    </svg>

                </button>
                : null
            }
        </div>
    );
}

export default TextField;