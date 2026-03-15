import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSvg } from "../../../svg/svg";
import StarButton from "../../../../components/starButton/starButton";
import { ChordDiagram } from "../../chords/chords";
import "./songPage.css";

function CreatorPage (){
    const navigate = useNavigate();
    const {songID} = useParams();


    const [starredSong, setStarredSong] = useState(false);

    const [song, setSong] = useState({songName: "Beautiful things", chords:[
        {name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [0, 0, 0, false]] , mute:[1]},
        {name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[]},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[]}
    ], lyrics: "hljkgu{0}gu jkgk{2}hl jgjkgk{1}{-1}j{0}g{-1}{-1}{-1}l{2}p"});
    

    useEffect(() => {
        async function loadSong() {
            const response = await fetch(`http://localhost:3001/songs/${songID}`, {
                method: "GET"
            });
            if(!response.ok){
                console.error("Failed to load song:", response.statusText);
                return;
            }
            const song = await response.json();
            setSong(song);
        }
        loadSong();
    }, [songID]);
    return (
        <div className="container">
            <div className="songContainer">
                <button className="starButtonContainer" style={{position: "absolute", top:"2vw", left: "15vw"}} onClick={() => {
                    setStarredSong(!starredSong);
                }}>
                    <StarButton starredChords={starredSong} disabled={true}/>
                </button>
                <button className="backButton" onClick={() => {
                    navigate(-1)
                }}>
                    <div className="columnLayout" style={{width: "100%", height: "100%"}}>
                        <ReturnSvg/>
                    </div>
                </button>
                <span className="songNameHeader">
                    {song.songName}
                </span>
                <div className="chords-container" style={{backgroundColor: "rgba(255, 255, 255, 0.4)", borderRadius: "3vw", paddingBottom: "1.5vw", marginBottom: "1vw", gap: "1vw"}}>
                    {song.chords.map((chord, index) =>{
                        return(
                            <div key={index} style={{width: "16vw", height: "22vw", zoom: 0.7, backgroundColor: "white", borderRadius: "2vw", padding: "0.5vw", paddingTop: "0"}}>
                                <ChordDiagram chord={chord}/>
                            </div>
                            
                        );
                    })}
                </div>
                <SongLyrics text={song.lyrics} chords={song.chords.map(chord => chord.name)}/>
            </div>
        </div>

    );
}

export default CreatorPage;


export function SongLyrics({ text, chords }) {
    let sectionWithChords = [];
    const sections = text.split(/(\n|\{\d+\})/);
    let chord;
    for(const section of sections){
        if(section === "\n"){
            sectionWithChords.push({sentence: null});
        }else if (/^\{\d+\}$/.test(section)) {
            const index = parseInt(section.slice(1, -1));
            chord = chords[index];
        }else{
            sectionWithChords.push({sentence: section, chord: chord});
            chord = null;
        }
    }
    return (
        <div className = "lyricsContainer">
            {sectionWithChords.map((s, idx) => (
                s.sentence == null?
                <div key={idx} className="rowContent left"/>
                :<div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <span style={{ display: "inline-block", height: "1vw", fontWeight: s.chord ? "bold" : "normal", color: s.chord ? "black" : "transparent", fontSize: "1.5vw" , marginBottom: "0.5vw"}}>
                        {s.chord || ""}
                    </span>
                    <span style={{ color: "black", fontSize: "1.2vw" }}>{s.sentence}</span>
                </div>
            ))}
        </div>
    );

}