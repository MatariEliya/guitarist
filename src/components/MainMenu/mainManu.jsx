import './mainMenu.css';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MainMenu({ className = '' , options = []}) {
    const navigate = useNavigate();
    const location = useLocation(); // כאן נשאב הנתיב הנוכחי

    const handleChange = (path) => {
        navigate(path);
    };

    const numOptions = options.length; // מספר האפשרויות בתפריט
    return (
        <div className={`radio-inputs ${className}`} style={{"--num-options": numOptions}}>
            {options.map((option) => (
                <label className="radio">
                    <input
                        type="radio"
                        name="radio"
                        checked={location.pathname === option.value}
                        onChange={() => handleChange(option.value)}
                    />
                    <span className="name">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export default MainMenu;

