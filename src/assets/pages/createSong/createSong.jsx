import React, {useState, useEffect, useRef } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../../globalsIndex";



import "./createSong.css"

import { usePopup } from "../../../components/Popup/usePopup";
import TextField from "../../../components/textField/textField";
import MultiLineTextField from "../../../components/MultiLineTextField/multiLineTextField";
import Uploader from "../../../components/fileUpload/uploader";
import { ChordDiagram } from "../chords/chords";
import { SongCard} from "../songs/songs";
import { SongLyrics } from "../songs/songPage/songPage";
import Checkbox from "../../../components/checkbox/checkbox";
function CreateSong () {
    const { userType } = useContext(GlobalContext);

    const {openPopup} = usePopup();

    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(0);

    const [ chords, setChords ] = useState([
        {chordId: 53, name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: true},
        {chordId: 54, name: "C", numCapo: 3 , fingers:[[1, 2, 4, true], [3, 3, 0, true], [3, 4, 0, true], [3, 5, 0, true]] , mute:[1] , difficult: 0, starred: false},
        {chordId: 55, name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [3, 6, 0, true]] , mute:[1], difficult: 0, starred: false},
        {chordId: 56, name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {chordId: 57, name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
        {chordId: 58, name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {chordId: 59, name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
    ])

    const [onEdit, setOnEdit] = useState(false);

    const [songName, setSongName] = useState("")
    const [artistName, setArtistName] = useState("")
    const [Image, setImage] = useState(null); // הקובץ עצמו
    const imagePreview = Image ? URL.createObjectURL(Image) : null;
    const [usedChord, setUsedChord] = useState([])
    const [startOnRight, setStartOnRight] = useState(false);
    const [lyrics, setLyrics] = useState("");

    const firstRender = useRef(true);

    useEffect(() => {
        async function loadChords() {
            const response = await fetch(`http://localhost:3001/chords`, {
                method: "GET",
            });

            const chordsData = await response.json();
            setChords(chordsData);
            if(firstRender.current){
                onFirstRender(chordsData);
                firstRender.current = false;
            }
        }
        if (userType === "creator"){ 
            loadChords();
        }else{
            console.log("user is not a creator");
        }
    }, [userType]);

    function onFirstRender(chordsData){
        if(userType !== "creator"){
            navigate("/songs")
        }
        async function loadSongData(songID) {
            const data = await fetch(`http://localhost:3001/songs/${songID}`, {
                method: "GET",
            });
            const songData = await data.json();
            console.log(songData);
            setSongName(songData?.songName);
            setArtistName(songData?.artist);
            setStartOnRight(songData?.startOnRight);
            setLyrics(songData?.lyrics);
            setUsedChord(songData?.chords.map(chord => {
                const chordIndex = chordsData.findIndex(c => c.chordId === chord.chordId);
                return chordIndex;
            }));
            await loadImage(songID);
        }
        if(location.state?.songID){
            loadSongData(location.state.songID);
            setOnEdit(true);
        }else{
            setOnEdit(false);
        }
    }

    async function loadImage(songID) {
        const response = await fetch(`http://localhost:3001/images/${songID}_song.webp`);
        if (response.ok) {
            const blob = await response.blob();

            const file = new File([blob], "image.jpg", { type: blob.type });

            setImage(file);
        }
    }
    



    const scrollLyrics = (
        <div className="scroll-area" style={{width: "60vw", height: "80vh", marginRight: "5vw"}}>
            <SongLyrics text={lyrics} chords={usedChord.map(chordIdx => chords[chordIdx].name)} StartOnRight={startOnRight}/>
        </div>
    );


    async function uploadSong(){
        const formData = new FormData();
        formData.append("image", Image);
        formData.append("songName", songName);
        formData.append("artistName", artistName);
        formData.append("startOnRight", startOnRight);
        formData.append("lyrics", lyrics);
        formData.append("chords", JSON.stringify(
            usedChord.map((chordIdx, order) => ({
                chordId: chords[chordIdx].chordId,
                indexChord: order
            }))
        ));
        if(onEdit){
            const response = await fetch(`http://localhost:3001/songs/${location.state.songID}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: formData
            });
            if(!response.ok){
                return false
            }
            return true
        }else{
            const response = await fetch("http://localhost:3001/songs", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: formData
            });
            if(!response.ok){
                return false
            }
            return true
        }

    }

    if (userType !== "creator") {
        return (
            <div className="page-container">
                <span>You do not have permission to access this page.</span>
            </div>
        );
    }
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
                    <Uploader onImageUpload={setImage} defaultImage={imagePreview}/>
                    <button className="text-button" onClick={() => {
                        if(songName){
                            openPopup({object: <SongCard className={"songCardpreview"} songName={songName} artist={artistName} image={imagePreview} />})
                        }else{
                            openPopup({header: "Name Error", text: "You must give the song a name"})
                        }
                    }}>
                        I must to see how it turns out🫣
                    </button>
                </div>
                
                /*page 1*/
                : page == 1 ? <div className="rowContent left" style={{paddingRight:"1vw"}}>
                    <div className="columnLayout" style={{width: "50%"}}>
                        <span style={{color: "black", fontSize: "1.5vw", fontWeight: "500"}}>choose chords from the list</span>
                        <div className="chords-container scroll-area" style={{width: "85%", height: "31vw", padding: "0.5vw", marginLeft: "3vw", gap: "1vw"}}>
                            {chords.map((chord, idx) =>{
                                return(
                                    !usedChord.includes(idx) ? <button key={idx} className="chordSelect" onClick={() => {
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
                                    <button key={idx} className="chordSelect" style={{position: "relative"}} onClick={() => {
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
                    <div className="chords-container" style={{width: "100%", margin: "3vw 0", padding: "0 2.7vw", gap: "1vw", marginLeft: "8vw"}}>
                        {usedChord.map((chord, idx) => {
                            return(
                                <div key={idx} className="chordSelect" style={{position: "relative"}}>
                                    <ChordDiagram chord={chords[chord]} fontSize={"1vw"}/>
                                    <span style={{color: "black", fontSize: "1vw", fontWeight: "500", position: "absolute", top: "0.5vw", right: "1vw"}}>{idx}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="rowContent">
                        <span style={{color: "black", fontSize: "1.2vw", fontWeight: "500"}}>start the lyrics on the right, for languages like hebrew or arabic</span>
                        <Checkbox checked={startOnRight} onChange={() => setStartOnRight(!startOnRight)}/>
                    </div>
                    <button className="text-button" onClick={() =>{
                        openPopup({header: "Lyrics instructions", text: "To write a chord symbol, write {chord number}"})
                    }}>
                        Lyrics instructions
                    </button>
                    <MultiLineTextField className={"lyricsTextInput"} text={"Write here the song's lyrics"} onChange={setLyrics} value={lyrics} startOnRight={startOnRight}/>
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
                    <button className="songPageNavigationButton" style={{backgroundColor: "rgb(33, 20, 37)"}} onClick={async () => {
                        if(page == 0 && (songName == "")){
                            openPopup({header: "Name Error", text: "You must give the song a name"})
                            return
                        }else if(page == 1 && usedChord.length == 0){
                            openPopup({header: "you must select chords", text:"If you don't have any chords, you can create one or add chord to your favorite"})
                            return
                        }else if(page > 1){
                            if (!(await uploadSong())) {
                                    openPopup({header: "Upload failed", text: "There was an error uploading your song. Please try again later."})
                                return
                            }
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