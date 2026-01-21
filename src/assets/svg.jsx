import React from "react";
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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            {!open && <line x1="3" y1="3" x2="21" y2="21"/>}
        </svg>
    )

}

export function profileSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22" width="2.25vw" height="3vw" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <clipPath id="clip0_104_2">
        <rect width="30" height="20" fill="white"/>
      </clipPath>
      <circle cx="10" cy="6" r="5" stroke="black" strokeWidth="1" />
      <circle cx="10" cy="19" r="8" stroke="black" strokeWidth="1" clipPath="url(#clip0_104_2)" />
    </svg>
  );
}
