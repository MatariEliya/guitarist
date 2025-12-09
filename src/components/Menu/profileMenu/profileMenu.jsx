import React from "react";
import { useNavigate } from "react-router-dom";
import './profileMenu.css';

function ProfileMenu() {
    console.log("ProfileMenu rendered");
    const navigate = useNavigate();
    return (
        <div className="menu">
            <button className="iconContainer" onClick={() => {
                console.log("iconContainer clicked");
                navigate("/loginSignup")
            }}>
                <img src="src/assets/images/profileIcon.png" alt="icon" className="profileIcon"/>
            </button>
        </div>
    );
}
export default ProfileMenu;