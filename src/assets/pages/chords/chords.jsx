import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import './chords.css';
import Carousel from "../../../components/Carousel/Carousel";
import Menu from "../../../components/Menu/menu";
import StarButton from "../../../components/starButton/starButton";
import TextField from "../../../components/textField/textField";
import { findMinFret, openMute } from "./findMinFret";
function Chords() {

    const {userType} = useContext(GlobalContext);
    const navigate = useNavigate();

    const [difficultLevel, setDifficultLevel] = useState(0);
    const [starredChords, setStarredChords] = useState(false);
    const [searchInput, setSearchInput] = useState("")

    const [rawchords, setRawChords] = useState([
        { name: "C",  capo: 1, fingers: [{string:5,fret:1,barre:0,isExist:true},{string:3,fret:2,barre:0,isExist:true},{string:2,fret:3,barre:0,isExist:true},{isExist:false}], mute:1, difficult:0, starred:true },
        { name: "C",  capo: 3, fingers: [{string:2,fret:1,barre:4,isExist:true},{string:3,fret:3,barre:0,isExist:true},{string:4,fret:3,barre:0,isExist:true},{string:5,fret:3,barre:0,isExist:true}], mute:1, difficult:0, starred:false },
        { name: "C",  capo: 1, fingers: [{string:5,fret:1,barre:0,isExist:true},{string:3,fret:2,barre:0,isExist:true},{string:2,fret:3,barre:0,isExist:true},{string:6,fret:3,barre:0,isExist:true}], mute:1, difficult:0, starred:false },
        { name: "G",  capo: 1, fingers: [{string:2,fret:2,barre:0,isExist:true},{string:1,fret:3,barre:0,isExist:true},{string:6,fret:3,barre:0,isExist:true},{isExist:false}], mute:0, difficult:0, starred:false },
        { name: "D",  capo: 1, fingers: [{string:4,fret:2,barre:0,isExist:true},{string:6,fret:2,barre:0,isExist:true},{string:5,fret:3,barre:0,isExist:true},{isExist:false}], mute:3, difficult:0, starred:false },
        { name: "Em", capo: 0, fingers: [{isExist:false},{string:2,fret:2,barre:0,isExist:true},{string:3,fret:2,barre:0,isExist:true},{isExist:false}], mute:0, difficult:0, starred:false },
        { name: "Am", capo: 1, fingers: [{string:5,fret:1,barre:0,isExist:true},{string:3,fret:2,barre:0,isExist:true},{string:4,fret:2,barre:0,isExist:true},{isExist:false}], mute:1, difficult:0, starred:false },
        { name: "F",  capo: 1, fingers: [{string:1,fret:1,barre:5,isExist:true},{string:4,fret:2,barre:0,isExist:true},{string:2,fret:3,barre:0,isExist:true},{string:3,fret:3,barre:0,isExist:true}], mute:0, difficult:0, starred:false },
        { name: "Bm", capo: 1, fingers: [{string:2,fret:2,barre:4,isExist:true},{string:5,fret:3,barre:0,isExist:true},{string:3,fret:4,barre:0,isExist:true},{string:4,fret:4,barre:0,isExist:true}], mute:1, difficult:1, starred:false },
        { name: "Gm", capo: 3, fingers: [{string:1,fret:1,barre:5,isExist:true},{isExist:false},{string:2,fret:3,barre:0,isExist:true},{string:3,fret:3,barre:0,isExist:true}], mute:0, difficult:1, starred:false }
    ]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`http://localhost:3001/chords`, {
                    method: "GET",
                    headers: {
                    }            
                });
                const data = await response.json()
                if(data) {
                    setRawChords(data)
                }
            }catch(err){
                console.error(err);
            }
        }        
        fetchData();
    }, [])





    let chords = sortChords(rawchords);

    function sortChords(chords) {
        let sortedChords = structuredClone(chords);
        let existingNames = new Map();

        for(let i = 0; i < sortedChords.length; i++) {
            if (!(starredChords && !sortedChords[i].starred) && (sortedChords[i].difficult <= difficultLevel)) {
                let name = sortedChords[i].name;
                if (!existingNames.has(name)) {
                    existingNames.set(name, []);
                }
                sortedChords[i].firstPos = i;
                existingNames.get(name).push(sortedChords[i]);
            }
        }
        return Array.from(existingNames.values());
    }
    function handleChange(path) {
        setDifficultLevel(Number(path));
    }

    const options = [{label: 'Basic', value: 0}, 
        {label: 'All', value: 1},         
    ];

    function toggleStar(realIndex) {
        setRawChords(prev =>
            prev.map((chord, i) =>
            i === realIndex
                ? { ...chord, starred: !chord.starred }
                : chord
            )
        );
    }

    

    
    return (
        <div className="chords-page">
            <div className="rowContent left" style={{paddingLeft: "5.5vw", paddingTop: "3vh"}}>
                <Menu className="chord-menu" location={difficultLevel} onChange={handleChange} options={options} />
                <button className="starButtonContainer" onClick={() => {
                    setStarredChords(!starredChords);
                }}>
                    <StarButton starredChords={starredChords} disabled={true}/>
                </button>
                <TextField className={"searchInputChords"} text="Search chord..." value={searchInput} onChange={(value) => {
                    setSearchInput(value)
                }}></TextField>
            </div>
            <div className="chords-container" >
                {userType === "creator" && <button className="createChord" onClick={() => {
                    navigate("/createChord");
                }}>+</button>}
                
                {chords.map((chord, chordIndex) =>
                    <div key={chordIndex} className="chord-item">
                        {chord.length > 1 ? (
                            <Carousel className="carousel">
                                {chord.map((variant, variantIndex) => (
                                    <ChordDiagram key={variant.name + variantIndex} chord={variant} onToggleStar={() => toggleStar(variant.firstPos)} />
                                ))}
                            </Carousel>
                        ) : (
                            <div style={{position: "relative"}}>
                                {starredChords === false || chord[0].starred === true ?(
                                    <ChordDiagram chord={chord[0]} onToggleStar={() => {
                                        toggleStar(chord[0].firstPos);
                                    }}/>
                                ) : null}
                            </div>
                            
                        )}
                        
                    </div>
                )}
            </div>
            <div className="rowContent" style={{margin: "1vw 0"}}>
                <button style={{width: "7vw", height: "3.5vw", fontSize: "1.1vw", fontWeight: "600"}}>previus</button>
                <button style={{width: "7vw", height: "3.5vw", fontSize: "1.1vw", fontWeight: "600"}}>next</button>
            </div>
        </div>
    );

};

export function ChordDiagram({chord, onToggleStar, fontSize}) {
    const mute = openMute(chord.mute);
    const open = findMinFret({...chord, mute});
    const x = chord.capo > 9 ? 35 : 25;
    return (
        <>
            {onToggleStar ?<div className="star-button-container">
                <StarButton className="star-button" starredChords={chord.starred === undefined ? false : chord.starred} changeValue={onToggleStar} disabled={false}/>
            </div>: null}
            <div className="chord">
                <p className="chord-name" style={{fontSize: fontSize}}>{chord.name}</p>
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
                    >{!chord.capo ? null : chord.capo === 1 ? "" : ` ${chord.capo}\u00A0\u00A0fret`}</text>
                    <text
                        x={x} y="10"
                        fill="#000000ff"
                        fontSize="10"
                        fontWeight="600"
                    >{!chord.capo ? null : chord.capo === 1 ? "" : chord.capo === 2 ? "nd" : chord.capo === 3 ? "rd" : "th"}</text>


                    {chord.capo > 1 ?<line x1="29" y1="70" x2="241" y2="70" stroke="#929292ff" strokeWidth="5"/>: null}
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
                        clipPath={chord.capo === 1 || !chord.capo ? "url(#longClipPath)" : "url(#shortClipPath)"}
                    />


                    <line x1="69" y1="55" x2="69" y2="325" stroke="#000000ff" strokeWidth="5"/>
                    <line x1="113" y1="55" x2="113" y2="325" stroke="#000000ff" strokeWidth="5"/>
                    <line x1="157" y1="55" x2="157" y2="325" stroke="#000000ff" strokeWidth="5"/>
                    <line x1="201" y1="55" x2="201" y2="325" stroke="#000000ff" strokeWidth="5"/>



                    {chord.fingers.map((finger, index) => (
                        finger.isExist && finger.fret > 0 && finger.string > 0 ?
                            <React.Fragment key={index}>
                                            
                                <rect
                                    x={44 * (finger.string - 1) + 5}
                                    y={65 * (finger.fret - 1) + 80}
                                    width={(finger.barre || 0) * 44 + 40}
                                    height="40"
                                    rx="20"
                                    ry="20"
                                    fill="#000000ff"
                                />

                                <text
                                    y={65 * (finger.fret - 1) + 107}
                                    x={44 * (finger.string - 1) + 19 + (finger.barre * 22)}
                                    fontSize="20"
                                    fontWeight="bold"
                                    fontFamily="Arial"
                                    fill="#ffffffff"
                                >{index + 1}</text>
                            </React.Fragment>
                        : null
                    ))}
                    {mute.map((isMuted, index) => (
                        !isMuted ?
                        <React.Fragment key={index}>
                            <line x1= {43 * (index) + 18} y1="25" x2={43 * (index) + 38} y2="45" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                            <line x1= {43 * (index) + 18} y1="45" x2={43 * (index) + 38} y2="25" stroke="#000000ff" strokeWidth="5" strokeLinecap="round"/>
                        </React.Fragment>
                        : null
                    ))}
                    {open.map((isOpen, index) => (
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
