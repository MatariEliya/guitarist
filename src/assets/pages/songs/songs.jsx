import './songs.css';

import React, {useState, useContext, useEffect, useMemo, useRef} from "react";
import { useNavigate} from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import { XSvg } from "../../svg/svg";
import TextField from "../../../components/textField/textField";
import StarButton from "../../../components/starButton/starButton";

import defaultSongImg from '../../images/defaultSongImg.png';

function Songs() {
    const {userType} = useContext(GlobalContext);


    const navigate = useNavigate();
    const [starredSong, setStarredSong] = useState(false);
    const [searchInput, setSearchInput] = useState("")


    const [serverSongsF, setServerSongsF] = useState([
        {songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", favorite: true},
        {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", favorite: false}
    ]);

    const songs = useMemo(() => {
        if(starredSong){
            return serverSongsF.filter(song => song.favorite);
        }
        return serverSongsF;
    }, [serverSongsF, starredSong]);

    const firstRender = useRef(true);
    useEffect(() => {
        console.log("http://localhost:3001/songs?search=" + normalizeText(searchInput));
        const fetchSongs = async () => {
            const response = await fetch("http://localhost:3001/songs?search=" + normalizeText(searchInput), {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });
            const data = await response.json();
            setServerSongsF(data);
        };
        if(firstRender.current){
            firstRender.current = false;
            fetchSongs();
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            fetchSongs();
        }, 500); // Adjust the debounce delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [searchInput]);

    return (
        <div className="container">
            <div className="contentSongs">
                <div style={{width: "100%", position: "relative"}}>
                    {userType !== "guest" &&
                        <button className="starButtonContainer" style={{position: "absolute", left: "30%", top: "1vw"}} onClick={() => {
                            setStarredSong(!starredSong);
                        }}>
                            <StarButton starredChords={starredSong} disabled={true}/>
                        </button>
                    }
                    <TextField className="searchInput" text="Search song or artist..." value={searchInput} onChange={(value) => {
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
                    {userType === "creator" && 
                        <>
                            <span style={{color: "black", fontWeight:"500", fontSize: "1vw", marginTop: "0.5vw"}}>or create your own song</span>
                            <button className="createSong" onClick={() =>{
                                navigate("/createSong")
                            }}>
                                +
                            </button>
                        </>
                    }
                </div>
                :<div className="songsContainer">
                    {userType === "creator" && <button className="createSong" onClick={() =>{
                        navigate("/createSong")
                    }}>
                        +
                    </button>}
                    {songs.map((song) => (
                        <SongCard key={song.songID} image={`http://localhost:3001/images/${song.songID}_song.webp`} songName={song.songName} artist={song.artist} onClick={() => navigate(`/songs/${song.songID}`)}/>
                    ))}
                </div>}
            </div>
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

export function SongCard({className, onClick, image, songName, artist = "unknown artist", fontSize}) {
    return(
        <button className={`songButton ${className || ""}`} onClick={onClick} onError={(e) => {
            e.target.src = defaultSongImg
        }}>
            <img src={image} className="songImg"/>
            <div className="songInfo">
                <span className="songName" style={{fontSize: `${fontSize || "2"}vw`}}>{songName}</span>
                <span className="artistName" style={{ fontSize: fontSize ? `${fontSize * 0.4}vw` : "0.8vw" }}>
                by: {artist ? artist : "unknown artist"}
                </span>
            </div>
        </button>
    )
}