import React, {useContext, useEffect, useState} from "react";
import './createChord.css';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import {ChordDiagram} from "../chords/chords"
import TextField from "../../../components/textField/textField";
import Checkbox from "../../../components/checkbox/checkbox";
import Menu from "../../../components/Menu/menu";
import { usePopup } from "../../../components/Popup/usePopup";

function CreateChord() {
    const navigate = useNavigate();
    const {userType} = useContext(GlobalContext);
    const {openPopup} = usePopup();

    const [chordInfo, setChordInfo] = useState({
        name: "",
        capo: "",
        fingers: [{string: "", fret: "", barre: "", isExist: false}, {string: "", fret: "", barre: "", isExist: false}, {string: "", fret: "", barre: "", isExist: false}, {string: "", fret: "", barre: "", isExist: false}],
        mute: 0,
        difficult: 0
    });
    const viewChord = {
        name: chordInfo.name? chordInfo.name : "chord name",
        capo: chordInfo.capo,
        fingers: chordInfo.fingers.map(finger => ({
            string: finger.string? Number(finger.string) : null,
            fret: finger.fret? Number(finger.fret) : null,  
            barre: finger.barre? Number(finger.barre) : null,
            isExist: finger.isExist? true : false
        })),
        mute: chordInfo.mute,
        difficult: chordInfo.difficult
    }

    if (userType !== "creator") {
        return (
            <div className="page-container">
                <span>You do not have permission to access this page.</span>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="chordContainer">
                <ChordDiagram chord={viewChord} onToggleStar={null} />
                <div className="rowContent" style={{marginTop: "1vw"}}>
                    <button className="saveChordButton"  onClick={() =>{

                        saveChord();
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
                    <TextField text="Chord name" value={chordInfo.name} maxLength={10} className="chordNameInput" onChange={(value) =>{
                        setChordInfo({...chordInfo, name: value})
                    }}></TextField>
                    <TextField type="number" value={chordInfo.capo} text="Fret num" maxLength={2} onChange={(value) =>{
                        setChordInfo({...chordInfo, capo: (value === "" || value === null ? "" : Number(value))});
                    }} className="capoInput"></TextField>
                </div>
                {chordInfo.fingers.map((finger, index) =>
                    <FingerPositions key={index} fingerNum={index + 1} fingerInfo={finger} chordInfo={chordInfo} setChordInfo={setChordInfo} />
                )}
                <div className="rowContent">
                    <span style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Mute strings:</span>
                    <div className="rowContent left" style={{gap: "1vw"}}>
                        {[1,2,3,4,5,6].map((stringNum, index) => (
                            <Checkbox key={index} className="muteStringCheckbox" onChange={(e) => {
                                setChordInfo(prev => {
                                    
                                    let newMute = prev.mute;
                                    if (e.target.checked) {
                                        newMute += Math.pow(2, stringNum - 1);
                                    } else {
                                        newMute -= Math.pow(2, stringNum - 1);
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
                    <span style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Difficulty:</span>
                    <Menu style={{margin: "1vw 2vw"}} location={chordInfo.difficult} onChange={(value) =>{
                        setChordInfo(prev => ({...prev, difficult: value}));
                    }} options={[{label: 'Basic', value: 0}, {label: 'difficult', value: 1}]} />
                </div>
            </div>
        </div>
    )

    async function saveChord() {
        if(!chordInfo.name){
            openPopup({text: "Please enter a name for the chord"})
            return;
        }
        const fingersData = chordInfo.fingers.map(finger => ({
            string: finger.string? Number(finger.string) : null,
            fret: finger.fret? Number(finger.fret) : null,
            barre: finger.barre? Number(finger.barre) : null,
            isExist: finger.isExist? true : false
        }));
        console.log(fingersData)
        const serverChordInfo = {
            name: chordInfo.name,
            numCapo: chordInfo.numCapo? Number(chordInfo.numCapo) : 0,
            fingers: fingersData,
            mute: chordInfo.mute,
            difficult: chordInfo.difficult
        }

        // כאן צריך לשלוח את הchordInfo לשרת ולשמור אותו במסד הנתונים
        const response = await fetch("http://localhost:3001/chords", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serverChordInfo)
        });
        if (response.ok) {
            // אם השמירה הצליחה, אפשר לנווט חזרה לדף הקודם או לדף הבית
            navigate(-1);
        } else {
            // אם הייתה שגיאה, אפשר להציג הודעת שגיאה למשתמש
            console.error("Failed to save chord");
        }
    }


}
export default CreateChord;


function FingerPositions ({fingerNum, fingerInfo, setChordInfo}){
    return(
        <div className="rowContent left" style={{paddingLeft: "1vw", gap: "1vw"}}>
            <span style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Finger {fingerNum}:</span>
            <Checkbox className="openStringsCheckbox" onChange={(e) => {
                handleFingerChange("isExist", e.target.checked);
            }}/>
            <div className="rowContent left" >
                <TextField type="number" text={"string"} value={fingerInfo.string} maxLength={1} className="fingerInput" onChange={(value) =>{
                    if(value > 0 && value < 7){
                        handleFingerChange("string", value)
                    }else{
                        handleFingerChange("string", "")
                    }
                }}></TextField>
                <TextField type="number" text={"fret"} value={fingerInfo.fret} maxLength={1} className="fingerInput" onChange={(value) => {
                    if (value > 0 && value < 5) {
                        handleFingerChange("fret", value);
                    }else{
                        handleFingerChange("fret", "");
                    }
                    }}></TextField>
                <TextField type="number" text={"barre"} value={fingerInfo.barre} maxLength={1} className="fingerInput" onChange={(value) =>{
                    handleFingerChange("barre", value);
                }}></TextField>
            </div>
            
        </div>
        
    )
    function handleFingerChange(index, value) {
        setChordInfo(prev => {
            const newFingers = [...prev.fingers];
            newFingers[fingerNum - 1] = {...newFingers[fingerNum - 1]};
            newFingers[fingerNum - 1][index] = (value === "" || value === null ? "" : Number(value));
            return{
                ...prev,
                fingers: newFingers
            };
        });
    }
}

