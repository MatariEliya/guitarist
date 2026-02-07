import React from "react";
import "./multiLineTextField.css";

function MultiLineTextField({ className, text, value, onChange}) {
  return (
    <div style={{position: "relative"}}>
        <textarea
            placeholder={text}
            rows={6}
            className={`multiLineTextField ${className}`}
            value={value} // value מגיע מההורה
            onChange={(e) => onChange(e.target.value)} // שולח חזרה להורה
        />
    </div>


  );
}

export default MultiLineTextField;
