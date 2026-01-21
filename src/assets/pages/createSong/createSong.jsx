import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import { usePopup } from "../../../components/Popup/usePopup";


import "./createSong.css"

import TextField from "../../../components/textField/textField";
import MultiLineTextField from "../../../components/MultiLineTextField/multiLineTextField";
import Uploader from "../../../components/fileUpload/uploader";
import { ChordDiagram } from "../chords/chords";
import { ChordCard, SongLyrics } from "../songs/songs";

function CreateSong () {
    const { openPopup } = usePopup();

    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    const [songName, setSongName] = useState("")
    const [artistName, setArtistName] = useState("")

    const [selectedImage, setSelectedImage] = useState(null); // הקובץ עצמו
    const imagePreview = selectedImage ? URL.createObjectURL(selectedImage) : null;   // הכתובת לתצוגה

    const handleImageChange = (file) => {
        setSelectedImage(file);
    };

    const [lyrics, setLyrics] = useState("");


    const chords = [
        {name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: true},
        {name: "C", numCapo: 3 , fingers:[[1, 2, 4, true], [3, 3, 0, true], [3, 4, 0, true], [3, 5, 0, true]] , mute:[1] , difficult: 0, starred: false},
        {name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [3, 6, 0, true]] , mute:[1], difficult: 0, starred: false},
        {name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
        {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false},
        {name: "Gm", numCapo:3 , fingers:[[1 ,1 ,5 ,true] ,[0 ,0 ,0 ,false] ,[3 ,2 ,0 ,true] ,[3 ,3 ,0 ,true]] , mute:[], difficult: 1, starred: false},
    ]
    const [usedChord, setUsedChord] = useState([])


    const scrollLyrics = (
        <div className="scroll-area" style={{width: "60vw", height: "80vh", marginRight: "5vw"}}>
            <SongLyrics text={lyrics.replace(/\n/g, "{-1}")} chords={usedChord.map(chordIdx => chords[chordIdx].name)} />
        </div>
    );
    return(
        <div className="container">
            <div className="creatChordContainer">
                {/*page 0*/
                page == 0 ?<div className="columnLayout">
                    <span style={{color: " rgb(82, 82, 82)", fontSize: "1.2vw", fontWeight: "500"}}>song name</span>
                    <TextField text={"Enter song name"} value={songName} className={"songNameInput"} onChange={(value) => {
                        setSongName(value)
                    }}/>
                    <span style={{color: " rgb(82, 82, 82)", fontSize: "1.2vw", fontWeight: "500"}}>artist name</span>
                    <TextField text={"Enter artist name"} value={artistName} className={"artistNameInput"} onChange={(value) => {
                        setArtistName(value)
                    }}/>
                    <span style={{color: " rgb(82, 82, 82)", fontSize: "1vw", fontWeight: "500"}}>Select image for the song's card</span>
                    <Uploader onImageUpload={handleImageChange}/>
                    <button className="text-button" onClick={() => {
                        if(songName && artistName){
                            openPopup({object: <ChordCard className={"songCardpreview"} songName={songName} artist={artistName} image={imagePreview} />})
                        }else{
                            openPopup({header: "Name Error", text: "You must give the song and the artist a name"})
                        }
                    }}>
                        I must to see how it turns out🫣
                    </button>
                </div>
                
                /*page 1*/
                : page == 1 ? <div className="rowContent left" style={{paddingRight:"1vw"}}>
                    <div className="columnLayout" style={{width: "50%"}}>
                        <span style={{color: "black", fontSize: "1.5vw", fontWeight: "500"}}>your chords/ your starred chord</span>
                        <div className="chords-container scroll-area" style={{width: "85%", height: "31vw", padding: "0.5vw", marginLeft: "3vw", gap: "1vw"}}>
                            {chords.map((chord, idx) =>{
                                return(
                                    !usedChord.includes(idx) ? <button className="chordSelect" onClick={() => {
                                        setUsedChord(prev => [...prev, idx]);
                                    }}>
                                        <ChordDiagram chord={chord} fontSize={"1vw"}/>
                                    </button>
                                    : null
                                                        
                                );
                            })}
                        </div>
                    </div>
                    <div className="columnLayout" style={{width: "50%"}}>
                        <span style={{color: "black", fontSize: "1.5vw", fontWeight: "500"}}>Selected chords</span>
                        <div className="chords-container scroll-area" style={{width: "85%", height: "31vw", padding: "0.5vw", marginRight: "3vw", gap: "1vw"}}>
                            {usedChord.map((chord, idx) =>{
                                return(
                                    <button className="chordSelect" style={{position: "relative"}} onClick={() => {
                                            setUsedChord(prev => prev.filter((_, index) => index !== idx));
                                        }}>
                                        <ChordDiagram chord={chords[chord]} fontSize={"1vw"}/>
                                        <span style={{color: "black", fontSize: "1vw", fontWeight: "500", position: "absolute", top: "0.5vw", right: "1vw"}}>{idx}</span>
                                    </button>
                                                        
                                );
                            })}
                        </div>
                    </div>
                </div> 
                
                /*page 2*/
                : page == 2 ? <div className="columnLayout">
                    <div className="rowContent left" style={{margin: "3vw 0", padding: "0 2.7vw"}}>
                        {usedChord.map((chord, idx) => {
                            return(
                                <div className="chordSelect" style={{position: "relative"}}>
                                    <ChordDiagram chord={chords[chord]} fontSize={"1vw"}/>
                                    <span style={{color: "black", fontSize: "1vw", fontWeight: "500", position: "absolute", top: "0.5vw", right: "1vw"}}>{idx}</span>
                                </div>
                            )
                        })}
                    </div>
                    <button className="text-button" onClick={() =>{
                        openPopup({header: "Lyrics instructions", text: "To write a chord symbol, write {chord number}"})
                    }}>
                        Lyrics instructions
                    </button>
                    <MultiLineTextField className={"lyricsTextInput"} text={"Write here the song's lyrics"} onChange={setLyrics}/>
                    <button className="text-button" onClick={() => {
                        openPopup({object: scrollLyrics})
                    }}>
                        I must to see how it turns out🫣
                    </button>
                </div>: null}


                <div className="rowContent" style={{margin: "1vw 0"}}>
                    <button className="songPageNavigationButton" style={{backgroundColor: " rgb(69, 39, 78)"}}onClick={() => {
                        if(page < 1){
                            navigate("/songs")
                        }else{
                            setPage(page - 1)
                        }
                    }}>
                        <span style={{color: "white", fontWeight: "500", fontSize: "1.2vw"}}>{page < 1 ? "Cancel" : "previous"}</span>
                    </button>
                    <button className="songPageNavigationButton" style={{backgroundColor: "rgb(33, 20, 37)"}} onClick={() => {
                        if(page == 0 && (songName == "" || artistName == "")){
                            openPopup({header: "Name Error", text: "You must give the song and the artist a name"})
                            return
                        }else if(page == 1 && usedChord.length == 0){
                            openPopup({header: "you must select chords", text:"If you don't have any chords, you can create one or add chord to your favorite"})
                            return
                        }else if(page > 1){
                            navigate("/songs")
                            return
                        }
                        setPage(page + 1)
                    }}>
                        <span style={{color: "white", fontWeight: "500", fontSize: "1.2vw"}}>{page > 1 ? "Save" : "Next"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CreateSong