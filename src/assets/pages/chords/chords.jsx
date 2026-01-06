import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import './chords.css';
import Carousel from "../../../components/Carousel/Carousel";
import Menu from "../../../components/Menu/menu";
import StarButton from "../../../components/starButton/starButton";
import { Button } from "@mui/material";
function Chords() {

    const {isAdmin} = useContext(GlobalContext);
    const navigate = useNavigate();

    const[difficultLevel, setDifficultLevel] = useState(0);
    const [starredChords, setStarredChords] = useState(false);
    
    let rawchords = [
       { name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: true},
        { name: "C", numCapo: 3 , fingers:[[1, 2, 4, true], [3, 3, 0, true], [3, 4, 0, true], [3, 5, 0, true]] , mute:[1] , difficult: 0, starred: false},
        { name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [3, 6, 0, true]] , mute:[1], difficult: 0, starred: false},
        { name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        { name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
        { name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        { name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
        { name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        { name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 0, starred: false},
        { name: "Gm", numCapo:3 , fingers:[[1 ,1 ,5 ,true] ,[0 ,0 ,0 ,false] ,[3 ,2 ,0 ,true] ,[3 ,3 ,0 ,true]] , mute:[], difficult: 0, starred: false},
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

    for (let chord of rawchords) {
        chord.open = findMinFret(chord);
    }

    const [chords, setChords] = useState(sortChords(rawchords));

    function sortChords(chords) {
        let sortedChords = structuredClone(chords);
        let existingNames = new Map();

        for (let chord of sortedChords) {
            let name = chord.name;
            if (!existingNames.has(name)) {
                existingNames.set(name, []);
            }
            existingNames.get(name).push(chord);
        }
        console.log(Array.from(existingNames.values()));
        return Array.from(existingNames.values());
    }
    const [selectedOption, setSelectedOption] = useState(0);
    function handleChange(path) {
        setSelectedOption(path);
    }

    const options = [{label: 'Basic', value: 0}, 
        {label: 'All', value: 1},         
    ];
    

    
    return (
        <div className="chords-page">
            <div className="rowContent left" style={{paddingLeft: "5.5vw", paddingTop: "3vh"}}>
                <Menu className="chord-menu" location={selectedOption} onChange={handleChange} options={options} />
                <button className="starButtonContainer" onClick={() => {
                    setStarredChords(!starredChords);
                }}>
                    <text>Favorite</text>
                    <StarButton starredChords={starredChords} disabled={true}/>
                </button>
            </div>
            <div className="chords-container">
                {isAdmin && <button className="createChord" onClick={() => {
                    navigate("/createChord");
                }}>+</button>}
                
                {chords.map((chord, index) =>
                    <div key={index} className="chord-item">
                        {chord.length > 1 ? (
                            <Carousel className="carousel" style={{ width: '16vw', height: '22vw' }}>
                                {chord.map((variant, index) => (
                                    <ChordDiagram key={variant.name + index} chord={variant} />
                                ))}
                                    

                            </Carousel>
                        ) : (
                            <ChordDiagram chord={chord[0]}/>
                        )}
                        
                    </div>
                )}
            </div>
        </div>
    );

};



export function ChordDiagram({ chord }) {
    let frets = [true, true, true, true, true, true];
    for (let finger of chord.fingers) {
        if (finger[0] !== 0 && finger[1] !== 0 && finger[3]) {
            frets[finger[1] - 1] = false;
            for (let i = 0; i < finger[2]; i++) {
                frets[finger[1] + i] = false;
            }
        }
        if (finger[1] + finger[2] > 6) {
            finger[2] = 6 - finger[1];
        }
    }
    for (let mute of chord.mute) {
        frets[mute - 1] = false;
    }
    const x = chord.numCapo > 9 ? 35 : 25;
    console.log(chord.starred);
    return (
        <>
            <div className="star-button-container">
                <StarButton className="star-button" starredChords={chord.starred}/>
            </div>
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
                >{!chord.numCapo ? null : chord.numCapo === 1 ? "" : ` ${chord.numCapo}\u00A0\u00A0fret`}</text>
                <text
                    x={x} y="10"
                    fill="#000000ff"
                    fontSize="10"
                    fontWeight="600"
                >{!chord.numCapo ? null : chord.numCapo === 1 ? "" : chord.numCapo === 2 ? "nd" : chord.numCapo === 3 ? "rd" : "th"}</text>


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
                    clipPath={chord.numCapo === 1 || !chord.numCapo ? "url(#longClipPath)" : "url(#shortClipPath)"}
                />


                <line x1="69" y1="55" x2="69" y2="325" stroke="#000000ff" strokeWidth="5"/>
                <line x1="113" y1="55" x2="113" y2="325" stroke="#000000ff" strokeWidth="5"/>
                <line x1="157" y1="55" x2="157" y2="325" stroke="#000000ff" strokeWidth="5"/>
                <line x1="201" y1="55" x2="201" y2="325" stroke="#000000ff" strokeWidth="5"/>



                {chord.fingers.map((finger, index) => (
                    finger[3] && finger[0] > 0 && finger[1] > 0 ?
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
                        <line x1= {43 * (isMuted - 1) + 18} y1="25" x2={43 * (isMuted - 1) + 38} y2="45" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                        <line x1= {43 * (isMuted - 1) + 18} y1="45" x2={43 * (isMuted - 1) + 38} y2="25" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                    </React.Fragment>
                    : null
                ))}
                {frets.map((isOpen, index) => (
                    isOpen ?
                    <React.Fragment key={index}>
                        <circle cx={43 * (index) + 28} cy="35" r="10" fill="#00000000" stroke="#000000ff" strokeWidth="5"/>
                    </React.Fragment>
                    : null
                ))}
            </svg>
        </div>
        </>
        
    );
}

export default Chords;
