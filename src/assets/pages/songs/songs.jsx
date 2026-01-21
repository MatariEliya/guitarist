import './songs.css';

import React, {useState, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import { XSvg } from "../../svg";
import TextField from "../../../components/textField/textField";
import StarButton from "../../../components/starButton/starButton";
import { ChordDiagram } from "../chords/chords";

function Songs() {
    const {isAdmin} = useContext(GlobalContext);


    const navigate = useNavigate();
    const location = useLocation();
    const [starredSongs, setStarredSongs] = useState(false);
    const [searchInput, setSearchInput] = useState("")


    const [serverSongsF, setServerSongsF] = useState([
        {songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
        {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}
    ]);
    const songs = serverSongsF.filter(songIF =>
        normalizeText(songIF.songName).includes(normalizeText(searchInput)) ||
        normalizeText(songIF.artist).includes(normalizeText(searchInput))
    );


    const [song, setSong] = useState({songName: "Beautiful things", chords:[
        {name: "C", numCapo: 1 , fingers:[[1, 5, 0, true], [2, 3, 0, true], [3, 2, 0, true], [0, 0, 0, false]] , mute:[1]},
        {name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[]},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[]}
    ], lyrics: "hljkgu{0}gu jkgk{2}hl jgjkgk{1}{-1}j{0}g{-1}{-1}{-1}l{2}p"});

    return (
        <div className="container">
            {location.pathname === "/songs"?
                <div className="contentSongs">
                    <div style={{width: "100%", position: "relative"}}>
                        <button className="starButtonContainer" style={{position: "absolute", left: "30%", top: "1vw"}} onClick={() => {
                            setStarredSongs(!starredSongs);
                        }}>
                            <StarButton starredChords={starredSongs} disabled={true}/>
                        </button>
                        <TextField className="searchInput" text="Search song or artist..." onEnter={(value) => {
                            setSearchInput(value)
                        }}></TextField>
                        <button className="cancelSearch" onClick={() => {
                            setSearchInput("")
                        }}>
                            <XSvg/>
                        </button>
                    </div>
                    {songs.length == 0 ? <div className="notF">
                        <span style={{color: "black", fontWeight:"700", fontSize: "3vw"}}>Sorry we didn't found anything...</span>
                        <span style={{color: "black", fontWeight:"500", fontSize: "1vw", marginTop: "0.5vw"}}>you can ask one of our admins on our about page to make what you are looking for</span>
                    </div>
                    :<div className="songsContainer">
                        {isAdmin && <button className="createSong" onClick={() =>{
                            navigate("/createSong")
                        }}>
                            +
                        </button>}
                        {songs.map((song) => (
                            song.straredSong || !starredSongs ? <ChordCard key={song.songID} image={song.image} songName={song.songName} artist={song.artist} onClick={() => navigate(`/songs/${song.songID}`)}/>
                            :null
                        ))}
                    </div>}
                </div>
            : <div className="songContainer">
                <button className="starButtonContainer" style={{position: "absolute", top:"2vw", left: "5vw"}} onClick={() => {
                    setStarredSongs(!starredSongs);
                }}>
                    <StarButton starredChords={starredSongs} disabled={true}/>
                </button>
                <span className="songNameHeader">
                    {song.songName}
                </span>
                <div className="chords-container" style={{backgroundColor: "rgba(255, 255, 255, 0.4)", borderRadius: "3vw", paddingBottom: "1.5vw", marginBottom: "1vw", gap: "1vw"}}>
                    {song.chords.map((chord) =>{
                        return(
                            <div style={{width: "16vw", height: "22vw", zoom: 0.7, backgroundColor: "white", borderRadius: "2vw", padding: "0.5vw", paddingTop: "0"}}>
                                <ChordDiagram chord={chord}/>
                            </div>
                            
                        );
                    })}
                </div>
                <SongLyrics text={song.lyrics} chords={song.chords.map(chord => chord.name)}/>
            </div>
            }
        </div>
    );
}
export default Songs;

function normalizeText(str) {
    return str
        .toLowerCase()                 // הכל לאותיות קטנות
        .replace(/[^a-z\u0590-\u05FF\s]/g, "")  // שומר רק על אותיות עבריות/אנגליות ורווחים
        .trim();                       // מסיר רווחים מיותרים בתחילת/סוף
}

export function SongLyrics({ text, chords }) {
    let sectionWithChords = [];
    const sections = text.split(/\{(-?\d+)\}/);
    let chord;
    for(const section of sections){
        if(/^[0-9]/.test(section)){
            chord = chords[parseInt(section)]
        }else if(/^-?\d+$/.test(section)){
            sectionWithChords.push({sentence: null});
        }else{
            sectionWithChords.push({sentence: section, chord: chord});
            chord = null;
        }
    }
    return (
        <div className = "lyricsContainer">
            {sectionWithChords.map((s, idx) => (
                s.sentence == null?
                <div className="rowContent left"/>
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

export function ChordCard({className, onClick, image, songName, artist}) {
    return(
        <button className={`songButton ${className || ""}`} onClick={onClick}>
            <img src={image} className="songImg"/>
            <div className="songInfo">
                <span className="songName">{songName}</span>
                <span className="artistName">by: {artist}</span>
            </div>
        </button>
    )
}