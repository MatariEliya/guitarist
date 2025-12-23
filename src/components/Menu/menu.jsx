import './menu.css';
import * as React from 'react';

function Menu({ className = '' ,location, onChange, options = []}) {
    const numOptions = options.length; // מספר האפשרויות בתפריט
    return (
        <div className={`radio-inputs ${className}`} style={{"--num-options": numOptions}}>
            {options.map((option) => (
                <label className={`radio ${option.value.toString().split('/')[1]}`}>
                    <input
                        type="radio"
                        name={`radio-${className}`}
                        checked={location === option.value}
                        onChange={() => {
                            onChange(option.value)
                        }}
                    />
                    <span className={`name `}>{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export default Menu;

