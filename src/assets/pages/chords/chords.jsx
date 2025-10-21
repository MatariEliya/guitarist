import React, { use } from "react";
import './chords.css';

function Chords() {

    let chords = [
        { name: "C", numCapo: 1 , fingers:[[1, 5, 0], [2, 3, 0], [3, 2, 0], [0, 0, 0]] , mute:[1]},
        { name: "G", numCapo: 1, fingers:[[2, 2, 0], [3, 1, 0], [3, 6, 0], [0, 0, 0]] , mute:[]},
        { name: "D", numCapo: 1, fingers:[[2, 4, 0], [2, 6, 0], [3, 5, 0], [0, 0, 0]] , mute:[1, 2]},
        { name: "Em", numCapo: 1, fingers:[[0, 0, 0], [2, 2, 0], [2, 3, 0], [0, 0, 0]] , mute:[]},
        { name: "Am", numCapo: 1, fingers:[[1, 5, 0], [2, 3, 0], [2, 4, 0], [0, 0, 0]] , mute:[1]},
        { name: "F", numCapo: 1, fingers:[[1, 1, 5], [2, 4, 0], [3, 2, 0], [3, 3, 0]] , mute:[]},
        { name: "Bm", numCapo: 1, fingers:[[2, 2, 4], [3, 5, 0], [4, 3, 0], [4, 4, 0]] , mute:[1]},
        { name: "Gm", numCapo: 3, fingers:[[1, 1, 5], [0, 0, 0], [3, 2, 0], [3, 3, 0]] , mute:[]},
    ];

    // מוצא את המיתרים הפתוחים
    function findMinFret(chord) {
        let frets = [true, true, true, true, true, true];
        for (let finger of chord.fingers) {
            if (finger[0] !== 0) {
                frets[finger[1] - 1] = false;
                for (let i = 0; i < finger[2]; i++) {
                    frets[finger[1] + i] = false;
                }
            }
        }
        for (let mute of chord.mute) {
            frets[mute - 1] = false;
        }
        return frets;
    }


    for (let chord of chords) {
        chord.open = findMinFret(chord);
    }

    
    return (
        <div className="chords-container">
            {chords.map((chord) => (
                <div className="chord">
                    <p className="chord-name">{chord.name}</p>
                    <svg viewBox="0 0 270 335" className="chord-svg">
                        <defs >
                            <clipPath id="longClipPath">
                                <rect x="15" y="55" width="240" height="20" rx="10%" ry="10%"/>
                            </clipPath>
                            <clipPath id="shortClipPath">
                                <rect x="15" y="55" width="240" height="7" rx="10%" ry="10%"/>
                            </clipPath>
                        </defs>
                        <text
                            x="15" y="18"
                            fill="#000000ff"
                            fontSize="20"
                            fontWeight="600"
                        >{chord.numCapo === 1 ? "" : ` ${chord.numCapo}\u00A0\u00A0fret`}</text>
                        <text
                            x="25" y="10"
                            fill="#000000ff"
                            fontSize="10"
                            fontWeight="600"
                        >{chord.numCapo === 1 ? "" : chord.numCapo === 2 ? "nd" : chord.numCapo === 3 ? "rd" : "th"}</text>

                        {chord.numCapo > 1 ?<line x1="29" y1="70" x2="241" y2="70" stroke="#929292ff" strokeWidth="5"/>: null}
                        <line x1="25" y1="130" x2="245" y2="130" stroke="#929292ff" strokeWidth="5"/>
                        <line x1="25" y1="195" x2="245" y2="195" stroke="#929292ff" strokeWidth="5"/>
                        <line x1="25" y1="260" x2="245" y2="260" stroke="#929292ff" strokeWidth="5"/>
                        
                        <rect 
                            x="25" y="55" width="220" height="270" 
                            rx="10%" ry="10%"
                            stroke="#000000ff" strokeWidth="5" 
                            fill="#00000000"
                        />
                        <rect
                            x="25" y="55" width="220" height="250" 
                            rx="10%" ry="10%"
                            stroke="#000000ff" strokeWidth="5" 
                            fill="#000000ff"
                            clipPath={chord.numCapo === 1 ? "url(#longClipPath)" : "url(#shortClipPath)"}
                        />


                        <line x1="69" y1="55" x2="69" y2="325" stroke="#000000ff" strokeWidth="5"/>
                        <line x1="113" y1="55" x2="113" y2="325" stroke="#000000ff" strokeWidth="5"/>
                        <line x1="157" y1="55" x2="157" y2="325" stroke="#000000ff" strokeWidth="5"/>
                        <line x1="201" y1="55" x2="201" y2="325" stroke="#000000ff" strokeWidth="5"/>



                        {chord.fingers.map((finger, index) => (
                            finger[0] !== 0 ?
                                <React.Fragment key={index}>
                                    
                                    <rect
                                        x={44 * (finger[1] - 1) + 5}
                                        y={65 * (finger[0] - 1) + 80}
                                        width={(finger[2]) * 44 + 40}
                                        height="40"
                                        rx="20"
                                        ry="20"
                                        fill="#000000ff"
                                    />

                                    <text
                                        y={65 * (finger[0] - 1) + 107}
                                        x={44 * (finger[1] - 1) + 19 + (finger[2] * 22)}
                                        fontSize="20"
                                        fontWeight="bold"
                                        fontFamily="Arial"
                                        fill="#ffffffff"
                                    >{index + 1}</text>
                                </React.Fragment>
                            : null
                        ))}
                        {chord.mute.map((isMuted, index) => (
                            isMuted ?
                            <React.Fragment key={index}>
                                <line x1= {43 * (index) + 18} y1="25" x2={43 * (index) + 38} y2="45" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                                <line x1= {43 * (index) + 18} y1="45" x2={43 * (index) + 38} y2="25" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                            </React.Fragment>
                            : null
                        ))}
                        {chord.open.map((isOpen, index) => (
                            isOpen ?
                            <React.Fragment key={index}>
                                <circle cx={43 * (index) + 28} cy="35" r="10" fill="#00000000" stroke="#000000ff" strokeWidth="5"/>
                            </React.Fragment>
                            : null
                        ))}
                    </svg>
                </div>
            ))}

        </div>
    );
};

export default Chords;
