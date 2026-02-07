import "./creatorPage.css";

import React, {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../../components/Popup/usePopup";
import { SongCard } from "../../songs/songs";
import { ChordDiagram } from "../../chords/chords";
import MultiLineTextField from "../../../../components/MultiLineTextField/multiLineTextField";
import { ReturnSvg, VSvg } from "../../../svg/svg";
import Menu from "../../../../components/Menu/menu";
import { YoutubeSvg, InstegramSvg, TikTokSvg } from "../../../svg/svg";

function CreatorPage(){
    const [creatorInfo] = useState({name: "EliyaMatari", bio: "This is the creator bio.\nHere you can write about yourself, your music style, experience, and anything else you'd like to share with your audience.", 
        links: {youtube: "https://www.youtube.com/watch?v=yMZn60XJFVk", instagram: "https://www.instagram.com", tiktok: "https://www.tiktok.com/@oshri.family"},
        songs: [
            {songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
            {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}
        ], 
        chords: [{name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
            {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
            {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
            {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
            {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false}
        ]
    });

    const request = useRef("");
    const [requestSent, setRequestSent] = useState(false);


    const navigate = useNavigate();
    const {openPopup} = usePopup();

    const sectionRef = useRef();

    const scrollToSection = () => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div className="container">
            <div className="columnLayout" style={{position: "relative", width: "90%", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "2vw", padding: "1.5vw 0", marginTop: "2vw"}}>
                <button className="backButton" onClick={() => {
                    navigate(-1)
                }}>
                    <div className="columnLayout" style={{width: "100%", height: "100%"}}>
                        <ReturnSvg/>
                    </div>
                </button>
                <Menu className="creatorPageMenu" options={[
                    {value: 'Youtube', label: <YoutubeSvg/>},
                    {value: 'Instagram', label: <InstegramSvg/>},
                    {value: 'TikTok', label: <TikTokSvg/>}
                ]} location={null} onChange={(value) => {
                    if(value === 'Youtube'){
                        window.open(creatorInfo.links.youtube, '_blank');
                    }else if(value === 'Instagram'){
                        window.open(creatorInfo.links.instagram, '_blank');
                    }else if(value === 'TikTok'){
                        window.open(creatorInfo.links.tiktok, '_blank');
                    }
                }}/>
                <div className="topCreatoPage"/>
                <span style={{fontFamily: 'songsNamesFonts', fontSize: '5vw', color: "rgb(55, 55, 55)"}}>{creatorInfo.name}</span>
                <p style={{fontSize: '1vw', fontWeight: "400", marginTop: '1vw', marginBottom: '3vw', color: "rgb(0, 0, 0)", whiteSpace: 'pre-line'}}>{creatorInfo.bio}</p>
                <button className="requestButton" onClick={scrollToSection}>Request someting</button>
                <span style={{fontSize: '2vw', fontWeight: 'bold', color: "rgb(85, 85, 85)"}}>Creator's Songs</span>
                <div className="groupContent" style={{backgroundColor: "rgba(255, 255, 255, 0.5)", gap: "2vw", padding: "3vw", borderRadius: "2vw", marginTop: "1vw"}}>
                    {creatorInfo.songs.map((song) =>
                        <SongCard key={song.songID} image={song.image} songName={song.songName} artist={song.artist} onClick={() => {navigate(`/songs/${song.songID}`)}}/>
                    )}
                </div>
                <span style={{fontSize: '2vw', fontWeight: 'bold', marginTop: '3vw', color: "rgb(85, 85, 85)"}}>Creator's Chords</span>

                <div className="groupContent" style={{backgroundColor: "rgba(255, 255, 255, 0.5)", gap: "2vw", padding: "3vw", borderRadius: "2vw", marginTop: "1vw", marginBottom: "4vw"}}>
                    {creatorInfo.chords.map((chord, index) =>
                        <div className="creatorChord" key={index}>

                            <ChordDiagram key={index} chord={chord}/>
                        </div>
                    )}
                </div>
                <div style={{position: "relative", width: "100%"}} >
                    {requestSent ?
                        <div className="topRequest columnLayout" style={{justifyContent: "center"}}>
                            <span style={{fontSize: '3vw', fontWeight: 'bold', color: "rgb(55, 55, 55)"}}>Request sent</span>
                            <VSvg/>
                        </div>
                        : null
                    }
                    <span style={{fontSize: '2vw', fontWeight: 'bold', marginBottom: '1vw', color: "rgb(85, 85, 85)"}}>Request something from {creatorInfo.name}</span>
                    <MultiLineTextField key={requestSent /*for reset component*/} className={"requestInput"} text={"write somthing..."} onChange={(value) => {
                        request.current = value;
                    }}/>
                    <button ref={sectionRef} className="sendRequestButton" onClick={() => {
                        if(request.current.trim() === "" && !requestSent){
                            openPopup({header: "Request can't be empty", text: "Please write something in the request box before sending."});
                        }else{
                            setRequestSent(!requestSent);
                            request.current = "";
                        }
                    }}>{requestSent ? "Send again" : "Send request"}</button>
                </div>
            </div>
        </div>
    );
};
export default CreatorPage;