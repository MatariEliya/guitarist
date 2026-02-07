import "./seeAllPage.css"

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePopup } from "../../../components/Popup/usePopup";


import { ChordDiagram } from "../chords/chords";
import { SongCard } from "../songs/songs";
import { ReturnSvg} from "../../svg/svg";



function SeeAllPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    const {openPopup} = usePopup();
    
    {/*s = stared c=created*/}
    const createdChords =[{name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false},
        {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false}]
    const staredChords =[]
    const createdSongs = [{songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
    {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false},
    {songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
    {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false},
    {songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
    {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}
]
    const staredSongs = []
    const requests = ["Request 1", "Request 2 ugiu hgoihoiho ihp ppo[ po\njh\n \n dfdsd\n\n\n gfghs\nsadffsafasfasfsafsafsafsafsa asfasf sfasaf f sf asf\n s \nfa \ndflg ", "Request 3", "khgku"]
    return(
        <div className="container">
            <div className="columnLayout" style={{position: "relative", width: "90%", backgroundColor: "#ffffff80", borderRadius: "3vw"}}>
                <button
                    className="backButton"
                    style={{top: "1vw", left: "2vw"}}
                    onClick={()=>navigate(-1)}
                >
                    <ReturnSvg/>
                </button>
                {type == "createdChords" ?
                    <>
                        <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>Created chords</span>
                        <div className="groupContent" style={{padding: "1.3vw", gap: "1vw"}}>
                            {createdChords.length > 0 ? 
                                createdChords.map((chord, index) => {
                                    return(
                                        <div style={{backgroundColor: "white", width: "11.5vw", height: "16.5vw", borderRadius: "1vw"}} key={index}>
                                            <ChordDiagram chord={chord} fontSize={"1.1vw"}/>
                                        </div>
                                    )
                                }) 
                            :
                                <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                                    <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you didn't created any chord</span>
                                </div>
                            }
                        </div>
                    </>
                : type == "staredChords" ? 
                    <>
                        <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>Your stared chords</span>
                        <div className="groupContent" style={{padding: "1.3vw", gap: "1vw"}}>
                            {staredChords.length > 0 ? 
                                staredChords.map((chord, index) => {
                                    return(
                                        <div style={{backgroundColor: "white", width: "11vw", height: "16.5vw", borderRadius: "1vw"}} key={index}>
                                            <ChordDiagram chord={chord} fontSize={"1.1vw"}/>
                                        </div>
                                    )
                                }) 
                            :
                                <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                                    <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you didn't star any chord</span>
                                </div>
                            }
                        </div>
                    </>
                : type == "createdSongs" ?
                    <>
                        <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>Created songs</span>
                        <div className="groupContent" style={{padding: "3.2vw", gap: "1vw"}}>
                            {createdSongs.length > 0 ? 
                                createdSongs.map((song, index) => {
                                    return(
                                        <SongCard className={"profilePageSongCard"} key={index} image={song.image} songName={song.songName} artist={song.artist} fontSize={"1.6"} onClick={() => navigate("/seeAll/staredSongs")}/>
                                    )
                                }) 
                            :
                                <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                                    <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you didn't created any song</span>
                                </div>
                            }
                        </div>
                    </>
                : type == "staredSongs" ? 
                    <>
                        <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>Created songs</span>
                        <div className="groupContent" style={{padding: "3.2vw", gap: "1vw"}}>
                            {staredSongs.length > 0 ? 
                                staredSongs.map((song, index) => {
                                    return(
                                        <SongCard className={"profilePageSongCard"} key={index} image={song.image} songName={song.songName} artist={song.artist} fontSize={"1.6"} onClick={() => navigate("/seeAll/staredSongs")}/>
                                    )
                                }) 
                            :
                                <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                                    <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you didn't star any song</span>
                                </div>
                            }
                        </div>
                    </>
                : type == "requests" ?
                    <>
                        <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>Your requests</span>
                        <div className="groupContent" style={{padding: "2vw 5vw", gap: "1vw"}}>
                            {requests.length > 0 ? 
                                requests.map((request, index) => {
                                    return(
                                        <button key={index} className="requestCard" onClick={() => {
                                            openPopup({text: request})
                                        }}>
                                            <p style={{whiteSpace: "pre-line", display: "block", fontSize: "0.9vw", fontWeight: "500", margin: "0"}}>{request}</p>
                                        </button>
                                    )
                                }) 
                            :
                                <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                                    <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you don't have any requests</span>
                                </div>
                            }
                        </div>
                    </>
                : null}
                <div className="rowContent" style={{margin: "1vw"}}>
                    <button style={{width: "7vw", height: "3.5vw", fontSize: "1.1vw", fontWeight: "600"}}>previus</button>
                    <button style={{width: "7vw", height: "3.5vw", fontSize: "1.1vw", fontWeight: "600"}}>next</button>
                </div>
            </div>
        </div>

    )
}
export default SeeAllPage