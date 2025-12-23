import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import './profileMenu.css';
import { useContext } from "react";


function ProfileMenu() {
    const {isConnected, setIsConnected} = useContext(GlobalContext);
    
    const navigate = useNavigate();
    return (
        <div className="menu">
            <div className="topOption">
                <button className="iconContainer profile" onClick={() => {
                    console.log("iconContainer clicked");
                    navigate("/loginSignup")
                }}>
                    <svg className="svgIcon profile" viewBox="0 0 30 24" fill="none">
                        <defs>
                            <clipPath id="lineClip">
                                <rect x="0" y="0" width="var(--clip-width,30)" height="24" />
                            </clipPath>
                            <clipPath id="clip0_104_2">
                                <rect width="30" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                        <circle cx="12" cy="6" r="5" stroke="black" strokeWidth="1" />
                        <circle cx="12" cy="19" r="8" stroke="black" strokeWidth="1" clipPath="url(#clip0_104_2)" />
                        
                        <line x1="20" y1="5" x2="28" y2="5" stroke="black" strokeWidth="1" strokeLinecap="round" className="line"/>
                        <line x1="20" y1="9" x2="28" y2="9" stroke="black" strokeWidth="1" strokeLinecap="round" className="line"/>
                        <line x1="22" y1="13" x2="28" y2="13" stroke="black" strokeWidth="1" strokeLinecap="round" className="line"/>

                    </svg>
                </button>
                <button className="iconContainer settings" onClick={() => {
                    console.log("Settings button clicked");
                    navigate("/settings");
                }}>
                    <svg
                        className="svgIcon settings"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .38 1.84 1.65 1.65 0 0 0-1.84-.38A1.65 1.65 0 0 0-7-7z" />
                    </svg>
                </button>
            </div>
            
            {isConnected && <button className="iconContainer logout" onClick={() => {
                setIsConnected(false);
            }}>
                <svg
                    className="svgIcon logout"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <path d="M3 5 3 3h10v18H3 " />
                    <path d="M0 12h8" />
                    <path d="M5 8l4 4-4 4" />
                </svg>
            </button>}

        </div>
    );
}
export default ProfileMenu;