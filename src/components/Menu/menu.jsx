import './menu.css';
import * as React from 'react';

function Menu({ className = '' ,location, onChange, options = [], extraWidth = 0}) {
    // מוריד את כל האפשרויות הריקות מהתפריט
    for(let i = 0; i < options.length; i++){
        if(!options[i]){
            options.splice(i, 1);
            i--;
        }
    }
    const numOptions = options.length;
     // מספר האפשרויות בתפריט
    extraWidth = extraWidth / 7;
    return (
        <div className={`radio-inputs ${className}`} style={{"--num-options": numOptions + extraWidth}}>
            {options.map((option, index) => (
                <label 
                    className={`radio ${option.value.toString().split('/')[1]}`} 
                    key={index}
                    style={{ cursor: "pointer" }}
                >
                    <input
                        type="radio"
                        name={`radio-${className}`}
                        checked={location === option.value}
                        onChange={() => onChange(option.value)}
                    />

                    {React.isValidElement(option.label)
                        ? React.cloneElement(option.label, { 
                            style: { flex: 1, width: "100%", cursor: "pointer"} 
                        })
                        : <span className="name" style={{ flex: 1 }}>
                            {option.label}
                        </span>}
                </label>
            ))}
        </div>
    );
}

export default Menu;

