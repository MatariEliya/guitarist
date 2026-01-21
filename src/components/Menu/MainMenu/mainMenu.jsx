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
    const path = location.pathname.startsWith("/songs/")? "/songs": location.pathname;
    console.log(path);

    return (
        <Menu className="main-menu" location={path} onChange={handleChange} options={options} />
    );
}

export default MainMenu;

