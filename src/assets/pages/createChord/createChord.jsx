import React, {use, useContext, useEffect, useState} from "react";
import './createChord.css';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import {ChordDiagram} from "../chords/chords"
import TextField from "../../../components/textField/textField";
import Checkbox from "../../../components/checkbox/checkbox";
import Menu from "../../../components/Menu/menu";
import {findMinFret} from "../chords/findMinFret";
function CreateChord() {
    const navigate = useNavigate();
    const {userType} = useContext(GlobalContext);

    const [chordInfo, setChordInfo] = useState({
        name: "chord name",
        numCapo: "",
        fingers: [["", "", "", false], ["", "", "", false], ["", "", "", false], ["", "", "", false]],
        open: [1,2,3,4,5,6],
        mute: [],
        difficult: 0
    });
    useEffect(() => {
        console.log(chordInfo)
    }, [chordInfo])

    if (userType !== "creator") {
        return (
            <div className="page-container">
                <h1>You do not have permission to access this page.</h1>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="chordContainer">
                <ChordDiagram chord={chordInfo} onToggleStar={null} />
                <div className="rowContent" style={{marginTop: "1vw"}}>
                    <button className="saveChordButton"  onClick={() =>{
                        navigate(-1)
                    }}>
                        Save Chord
                    </button>
                    <button className="cancel" onClick={() => {
                        navigate(-1);
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
            <div className="cc-inputContainer">
                <div className="rowContent">
                    <TextField text="Chord name" value={chordInfo.name == "chord name" ? null : chordInfo.name} maxLength={10} className="chordNameInput" onChange={(value) =>{
                        if(!value) setChordInfo({...chordInfo, name: "chord name"})
                        else setChordInfo({...chordInfo, name: value})
                    }}></TextField>
                    <TextField type="number" value={chordInfo.numCapo} text="Fret num" maxLength={2} onChange={(value) =>{
                        setChordInfo({...chordInfo, numCapo: (value === "" || value === null ? "" : Number(value))});
                    }} className="capoInput"></TextField>
                </div>
                {chordInfo.fingers.map((finger, index) =>
                    <FingerPositions fingerNum={index + 1} fingerInfo={finger} chordInfo={chordInfo} setChordInfo={setChordInfo} />
                )}
                <div className="rowContent">
                    <text style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Mute strings:</text>
                    <div className="rowContent left" style={{gap: "1vw"}}>
                        {[1,2,3,4,5,6].map((stringNum) => (
                            <Checkbox key={stringNum} className="muteStringCheckbox" onChange={(e) => {
                                setChordInfo(prev => {
                                    let newMute = [...prev.mute];
                                    if (e.target.checked) {
                                        newMute.push(stringNum);
                                    } else {
                                        newMute = newMute.filter(num => num !== stringNum);
                                    }
                                    return {
                                        ...prev,
                                        mute: newMute
                                    };
                                });
                            }} />
                        ))}
                    </div>
                </div>
                <div className="rowContent left" style={{gap: "0.5vw"}}>
                    <text style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Difficulty:</text>
                    <Menu style={{margin: "1vw 2vw"}} location={chordInfo.difficult} onChange={(value) =>{
                        setChordInfo(prev => ({...prev, difficult: value}));
                    }} options={[{label: 'Basic', value: 0}, {label: 'difficult', value: 1}]} />
                </div>
            </div>
        </div>
    )



}
export default CreateChord;


    function FingerPositions ({fingerNum, fingerInfo, setChordInfo}){
        return(
            <div className="rowContent left" style={{paddingLeft: "1vw", gap: "1vw"}}>
                <text style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Finger {fingerNum}:</text>
                <Checkbox className="openStringsCheckbox" onChange={(e) => {
                    handleFingerChange(3, e.target.checked);
                }}/>
                <div className="rowContent left" >
                    <TextField type="number" text={"string"} value={fingerInfo[1]} maxLength={1} className="fingerInput" onChange={(value) =>{
                        if(value > 0 && value < 7){
                            handleFingerChange(1, value)
                        }else{
                            handleFingerChange(1, "")
                        }
                    }}></TextField>
                    <TextField type="number" text={"fret"} value={fingerInfo[0]} maxLength={1} className="fingerInput" onChange={(value) => {
                        if (value > 0 && value < 5) {
                            handleFingerChange(0, value);
                        }else{
                            handleFingerChange(0, "");
                        }
                        }}></TextField>
                    <TextField type="number" text={"barre"} value={fingerInfo[2]} maxLength={1} className="fingerInput" onChange={(value) =>{
                        handleFingerChange(2, value);
                    }}></TextField>
                </div>
                
            </div>
            
        )
        function handleFingerChange(index, value) {
            setChordInfo(prev => {
                const newFingers = [...prev.fingers];
                newFingers[fingerNum - 1] = [...newFingers[fingerNum - 1]];
                newFingers[fingerNum - 1][index] = (value === "" || value === null ? "" : Number(value));
                return{
                    ...prev,
                    fingers: newFingers
                };
            });
        }
    }