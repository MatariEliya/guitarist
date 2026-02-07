import React from "react";

//import InstegramSvgFile from "./instegram.svg?react";

export function SearchSvg(){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={{ display: "block" }}
        >
            <line x1="21" y1="3" x2="3" y2="21"/>
            <line x1="21" y1="21" x2="3" y2="3"/>
        </svg>
    )
}

export function UploaderSvg() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" g strokeWidth="0" strokeLinejoin="round" strokeLinecap="round">
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
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            {!open && <line x1="3" y1="3" x2="21" y2="21"/>}
        </svg>
    )
}
export function ReturnSvg(width="100%", height="100%") {
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
export function SeeAllSvg(width="100%", height="100%") {
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
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
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
export function ProfileSvg({userType}) {
    console.log("User Type in ProfileSvg:", userType);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${userType === "guest" ? 20 : 60} 22`} width={userType === "guest" ? "2.25vw" : "6.75vw"} height="3vw" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <clipPath id="clip0_104_2">
                <rect width="20" height="20" fill="white"/>
            </clipPath>
            <circle cx="10" cy="6" r="5" stroke="black" strokeWidth="1" />
            <circle cx="10" cy="19" r="8" stroke="black" strokeWidth="1" clipPath="url(#clip0_104_2)" />
            {userType !== "guest" && (
                <text x="40" y={userType == "creator" ? "8" : "14"} textAnchor="middle" stroke="none" fontSize="7" fontWeight="500" fill="black">{"Eliya matari"}</text>
            )}
            {userType == "creator" && (
                <text x="40" y="18" textAnchor="middle" stroke="none" fontSize="9" fontWeight="600" fill="black">{"Creator"}</text>
            )}
            
        </svg>
    );
}
