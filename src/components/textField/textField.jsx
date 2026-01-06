import React from "react";
import { useState } from "react";
import './textField.css';

function TextField({type, text, icon, className, maxLength, onChange}) {
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const effectiveType = showPassword ? "text" : type == "number" ? "text" : type;


    const handleChange = (e) => {
        const newValue = e.target.value;
        if (type === "number") {
            if (newValue === '' || /^[0-9]+$/.test(newValue)){
                setValue(newValue);
                onChange(newValue);
            }
        } else {
            setValue(newValue);
            onChange(newValue);
        }
    };



    return(
        <div className="textFieldContainer">
            <input 
            value={value} 
            placeholder={text} 
            type={effectiveType} 
            name="text" 
            maxLength={maxLength}
            className={`input ${className}`}
            onChange={handleChange}
            />
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