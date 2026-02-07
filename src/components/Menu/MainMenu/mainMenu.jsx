import './mainmenu.css';


import React, {useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../../globalsIndex';

import Menu from '../menu';
import { ProfileSvg } from '../../../assets/svg/svg';



function MainMenu({ options = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useContext(GlobalContext);

  const handleChange = (path) => {
    navigate(path);
  };

  const path = location.pathname.startsWith("/songs/")
    ? "/songs"
    : location.pathname.startsWith("/creators/")
    ? "/creators"
    : location.pathname;

  const menuOptions = [
    { value: userType === "guest" ? "/loginSignup" : "/profile", label: <ProfileSvg userType={userType} />, menu: false },
    ...options
  ];

  return (
    <Menu
      className="main-menu"
      location={path}
      onChange={handleChange}
      options={menuOptions}
      extraWidth={userType === "guest" ? 0 : 4.5}
    />
  );
}
export default MainMenu;