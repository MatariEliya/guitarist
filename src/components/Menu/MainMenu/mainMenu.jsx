import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../menu';
import './mainmenu.css';
function MainMenu({options = []}) {
    const navigate = useNavigate();
    const location = useLocation(); // כאן נשאב הנתיב הנוכחי

    const handleChange = (path) => {
        navigate(path);
    };

    return (
        <Menu className="main-menu" location={location.pathname} onChange={handleChange} options={options} />
    );
}

export default MainMenu;

