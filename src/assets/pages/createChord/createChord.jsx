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
    const {isAdmin} = useContext(GlobalContext);

    const [chordInfo, setChordInfo] = useState({
        name: "chord name",
        numCapo: 1,
        fingers: [[0, 0, 0, false], [0, 0, 0, false], [0, 0, 0, false], [0, 0, 0, false]],
        open: [1,2,3,4,5,6],
        mute: [],
        difficult: 0
    });

    if (!isAdmin) {
        return (
            <div className="page-container">
                <h1>You do not have permission to access this page.</h1>
            </div>
        );
    }
    useEffect(() => {
        setChordInfo(prev => ({
            ...prev,
            open: findMinFret(prev)
        }));
    }, [chordInfo.fingers, chordInfo.mute]);

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
                    <TextField text="Chord name" maxLength={10} className="chordNameInput" onChange={(value) =>{
                        if(!value) setChordInfo({...chordInfo, name: "chord name"})
                        else setChordInfo({...chordInfo, name: value})
                    }}></TextField>
                    <TextField type="number" text="Fret num" maxLength={2} onChange={(value) =>{
                        setChordInfo({...chordInfo, numCapo: Number(value)});
                    }} className="capoInput"></TextField>
                </div>
                <FingerPositions finger={1} chordInfo={chordInfo} setChordInfo={setChordInfo} />
                <FingerPositions finger={2} chordInfo={chordInfo} setChordInfo={setChordInfo} />
                <FingerPositions finger={3} chordInfo={chordInfo} setChordInfo={setChordInfo} />
                <FingerPositions finger={4} chordInfo={chordInfo} setChordInfo={setChordInfo} />
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


    function FingerPositions ({finger, setChordInfo}){
        return(
            <div className="rowContent left" style={{paddingLeft: "1vw", gap: "1vw"}}>
                <text style={{color: "black", fontSize: "1.2vw", width: "7vw"}}>Finger {finger}:</text>
                <Checkbox className="openStringsCheckbox" onChange={(e) => {
                    handleFingerChange(3, e.target.checked);
                }}/>
                <div className="rowContent left" >
                    <TextField type="number" text={"string"} maxLength={1} className="fingerInput" onChange={(value) =>{
                        if(value > 0 && value < 7){
                            handleFingerChange(1, Number(value))
                        }else{
                            handleFingerChange(1, 0)
                        }
                    }}></TextField>
                    <TextField type="number" text={"fret"} maxLength={1} className="fingerInput" onChange={(value) => {
                        if (value > 0 && value < 5) {
                            handleFingerChange(0, value);
                        }else{
                            handleFingerChange(0, 0);
                        }
                        }}></TextField>
                    <TextField type="number" text={"barre"} maxLength={1} className="fingerInput" onChange={(value) =>{
                        handleFingerChange(2, value);
                    }}></TextField>
                </div>
                
            </div>
            
        )
        function handleFingerChange(index, value) {
            setChordInfo(prev => {
                const newFingers = [...prev.fingers];
                newFingers[finger - 1] = [...newFingers[finger - 1]];
                newFingers[finger - 1][index] = Number(value);
                return{
                    ...prev,
                    fingers: newFingers
                };
            });
        }
    }