import React from "react";
import { useState } from "react";
import './textField.css';
import { PasswordEyeSvg } from "../../assets/svg/svg";

function TextField({type, text, value, Icon, className, maxLength, onChange, onEnter, noSpace}) {
    const [showPassword, setShowPassword] = useState(false);
    const effectiveType = showPassword ? "text" : type == "number" ? "text" : type;


    const handleChange = (e) => {
        const newValue = e.target.value;
        if(noSpace && newValue.includes(" ")){
            return
        }
        if (type === "number") {
            if (newValue === '' || /^[0-9]+$/.test(newValue)){
                onChange(newValue);
            }
        } else {
            onChange(newValue);
        }
    };
    const handelKey = (e) =>{
        if(e.key === "Enter"){
            onEnter(value);
        }
    }



    return(
        <div className="textFieldContainer">
            <input 
                value={value ? value : ""}
                placeholder={text}
                type={effectiveType} 
                name="text" 
                maxLength={maxLength}
                className={`input ${className}`}
                onChange={handleChange}
                onKeyDown={handelKey}
            />
            {showPassword || type === "password" ?
                <button 
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <PasswordEyeSvg open={showPassword}/>

                </button>
                : null
            }
            
        </div>
    );
}

export default TextField;