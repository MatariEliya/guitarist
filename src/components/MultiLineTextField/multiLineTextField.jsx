import React from "react";
import "./multiLineTextField.css";

function MultiLineTextField({ className, text, value, onChange }) {
  return (
    <div style={{position: "relative"}}>
        <textarea
            placeholder={text}
            rows={6}
            className={`multiLineTextField ${className}`}
            value={value} // value מגיע מההורה
            onChange={(e) => onChange(e.target.value)} // שולח חזרה להורה
        />
        <div style={{position: "absolute", top: "0", right: "0", width: "0.8vw", height: "100%", cursor: "default"}}>
            <div style={{pointerEvents: "none", height: "100%", width:"100%"}}/>
        </div>
    </div>


  );
}

export default MultiLineTextField;
