import './menu.css';
import * as React from 'react';

function Menu({ className = '' ,location, onChange, options = [], extraWidth = 0}) {
    const numOptions = options.length; // מספר האפשרויות בתפריט
    extraWidth = extraWidth / 7;
    return (
        <div className={`radio-inputs ${className}`} style={{"--num-options": numOptions + extraWidth}}>
            {options.map((option) => (
                <label className={`radio ${option.value.toString().split('/')[1]}`}>
                    <label className={`radio ${option.value.toString().split('/')[1]}`} style={{ flex: 1 }}>
                    <input
                        type="radio"
                        name={`radio-${className}`}
                        checked={location === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    {React.isValidElement(option.label)
                        ? React.cloneElement(option.label, { style: { flex: 1, width: "100%" } })
                        : <span className={`name`} style={{ flex: 1 }}>{option.label}</span>}
                    </label>
                </label>
            ))}
        </div>
    );
}

export default Menu;

