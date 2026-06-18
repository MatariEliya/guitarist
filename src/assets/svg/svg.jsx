import React from "react";

//import InstegramSvgFile from "./instegram.svg?react";

export function StarSvg(){
    return(
        <>
            <svg className="star-regular" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" pointerEvents="auto"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg>
            <svg className="star-solid" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" pointerEvents="auto"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>
        </>
    )
}
export function SearchSvg(){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>

    )
}

export function XSvg({height = "2vw", width = "2vw"}){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width={width} 
            height={height}
            fill="none"
            stroke="rgba(104, 104, 104, 1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "block" }}
        >
            <line x1="21" y1="3" x2="3" y2="21"/>
            <line x1="21" y1="21" x2="3" y2="3"/>
        </svg>
    )
}

export function UploaderSvg() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="0" strokeLinejoin="round" strokeLinecap="round">
            <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path>
        </svg>
    )
}



export function PasswordEyeSvg({open}){
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5vw"
            height="1.5vw"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            {!open && <line x1="3" y1="3" x2="21" y2="21"/>}
        </svg>
    )
}
export function ReturnSvg({width="100%", height="100%"}) {
    return(
        <svg viewBox="0 0 48 24" width={width} height={height} stroke="black" strokeWidth={1.5} strokeLinecap="round">
            <line x1={4} y1={12} x2={8} y2={16} />
            <line x1={4} y1={12} x2={8} y2={8} />
            <text x={18} y={16} fill="black" fontSize={12}  stroke="none">
                Back
            </text>
        </svg>
    )
}
export function SeeAllSvg({width="100%", height="100%"}) {
    return(
        <svg viewBox="0 0 48 24" width={width} height={height} stroke="black" strokeWidth={1.5} strokeLinecap="round">
            <line x1={42} y1={12} x2={38} y2={16} />
            <line x1={42} y1={12} x2={38} y2={8} />
            <text x={0} y={16} fill="black" fontSize={10}  stroke="none">
                See All
            </text>
        </svg>
    )
}
export function VSvg() {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#2ecc71"/>
        <path
            d="M28 52 L45 68 L72 32"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
    )
}
export function YoutubeSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.57 20" width="3vw" height="3vw" fill="currentColor">
            <g>
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
            </g>
        </svg>
    );
}
export function InstegramSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="3vw"
            height="3vw"
            fill="none"
            stroke="#E1306C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />

            <circle cx="12" cy="12" r="4" />

            <circle cx="17" cy="7" r="1" fill="#E1306C" stroke="none" />
        </svg>

    );
}
export function TikTokSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="3vw"
            height="3vw"
            fill="black"
        >
            <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
        </svg>
    );
}
export function ProfileSvg({userType, username}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${userType === "guest" ? 20 : 60} 22`} width={userType === "guest" ? "2.25vw" : "6.75vw"} height="3vw" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <clipPath id="clip0_104_2">
                <rect width="20" height="20" fill="white"/>
            </clipPath>
            <circle cx="10" cy="6" r="5" stroke="black" strokeWidth="1" />
            <circle cx="10" cy="19" r="8" stroke="black" strokeWidth="1" clipPath="url(#clip0_104_2)" />
            {userType !== "guest" && (
                <text x="40" y={userType == "creator" ? "8" : "14"} textAnchor="middle" stroke="none" fontSize="7" fontWeight="500" fill="black">{username}</text>
            )}
            {userType == "creator" && (
                <text x="40" y="18" textAnchor="middle" stroke="none" fontSize="9" fontWeight="600" fill="black">{"Creator"}</text>
            )}
            
        </svg>
    );
}

export function TrashSvg({width="2vw", height="2vw"}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="7" y1="5" x2="17" y2="5"/>

            <rect x="6" y="6" width="12" height="14" rx="2"/>
            
            <line x1="10" y1="12" x2="10" y2="20"/>
            <line x1="14" y1="12" x2="14" y2="20"/>
        </svg>
    );
}

export function PencilSvg({width="4vw", height="4vw"}) {
    return (
        <svg width={width} height={height} viewBox="30 30 150 150" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g transform="rotate(45 100 100)">
                
                <rect x="60" y="90" width="80" height="20"/>
                
                <rect x="50" y="90" width="10" height="20"/>
                
                <rect x="60" y="90" width="5" height="20"/>
                
                <polygon points="140,90 160,100 140,110"/>
                
                <polygon points="160,100 155,97 155,103"/>
                
            </g>
        </svg>
    )
}

export function CheckboxSvg() {
    return (
        <svg fill="none" viewBox="0 0 24 24" className="checkbox-icon">
            <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="3"
                stroke="currentColor"
                d="M4 12L10 18L20 6"
                className="check-path"
            ></path>
        </svg>
    );
}
