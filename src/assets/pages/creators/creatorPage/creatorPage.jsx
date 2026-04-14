import "./creatorPage.css";

import React, {useState, useRef, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GlobalContext } from "../../../../globalsIndex";

import { usePopup } from "../../../../components/Popup/usePopup";
import { SongCard } from "../../songs/songs";
import { ChordDiagram } from "../../chords/chords";
import MultiLineTextField from "../../../../components/MultiLineTextField/multiLineTextField";
import { ReturnSvg, VSvg } from "../../../svg/svg";
import Menu from "../../../../components/Menu/menu";
import { YoutubeSvg, InstegramSvg, TikTokSvg } from "../../../svg/svg";

function CreatorPage(){
    const { creatorID } = useParams();
    const {userType} = useContext(GlobalContext);


    const [creatorInfo, setCreatorInfo] = useState({name: "EliyaMatari", bio: "This is the creator bio.\nHere you can write about yourself, your music style, experience, and anything else you'd like to share with your audience.", 
        links: {youtube: "https://www.youtube.com/watch?v=yMZn60XJFVk", instagram: "https://www.instagram.com", tiktok: ""},
        songs: [
            {songID: "gtg8t67v", songName: "I'm still standing", artist: "Elton John", straredSong: true},
            {songID: "uh7yiuhu", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}
        ], 
        chords: [{name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2]},
            {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[]},
            {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1]},
            {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[]},
            {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1]}
        ]
    });

    const [request, setRequest] = useState("");
    const [requestSent, setRequestSent] = useState(false);


    const navigate = useNavigate();
    const {openPopup, closePopup} = usePopup();

    const sectionRef = useRef();

    const scrollToSection = () => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`http://localhost:3001/creators/creatorInfo/${creatorID}`, {
                    method: "GET"            
                });
                const data = await response.json()
                if(response.ok){
                    setCreatorInfo(data);
                }else{
                    setCreatorInfo(null)
                }
            }catch(err){
                console.error(err);
            }
        }
        fetchData();
    }, [])


    async function sendRequestToCreator() {
        try {
            const response = await fetch(`http://localhost:3001/creators/requests`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({creatorID, request })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server error:", errorData.message);
                return;
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    }
    if (!creatorInfo) {
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
                    <div className="topCreatoPage"/>
                    <span style={{fontSize: '5vw', fontWeight: "800", color: "rgb(55, 55, 55)", marginTop: "2vw"}}>Creator not found</span>
                    <span style={{fontSize: '2vw' , fontWeight: "500", color: "rgb(55, 55, 55)"}}>sorry, the creator you're looking for was not found.</span>
                </div>
            </div>
        )
    }
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
                {(creatorInfo.youtube || creatorInfo.instagram || creatorInfo.tiktok) && <Menu className="creatorPageMenu" options={[
                    creatorInfo.youtube?{value: 'Youtube', label: <YoutubeSvg/>}: null,
                    creatorInfo.instagram?{value: 'Instagram', label: <InstegramSvg/>}: null,
                    creatorInfo.tiktok?{value: 'TikTok', label: <TikTokSvg/>}: null
                ]} location={null} onChange={(value) => {
                    if(value === 'Youtube'){
                        window.open(creatorInfo.youtube, '_blank');
                    }else if(value === 'Instagram'){
                        window.open(creatorInfo.instagram, '_blank');
                    }else if(value === 'TikTok'){
                        window.open(creatorInfo.tiktok, '_blank');
                    }
                }}/>}
                <div className="topCreatoPage"/>
                <span style={{fontFamily: 'songsNamesFonts', fontSize: '5vw', color: "rgb(55, 55, 55)"}}>{creatorInfo.creatorName}</span>
                <p style={{fontSize: '1vw', fontWeight: "400", marginTop: '1vw', marginBottom: '3vw', color: "rgb(0, 0, 0)", whiteSpace: 'pre-line'}}>{creatorInfo.bio}</p>
                <button className="requestButton" onClick={scrollToSection}>Request someting</button>
                <span style={{fontSize: '2vw', fontWeight: 'bold', color: "rgb(85, 85, 85)"}}>Creator's Songs</span>
                <div className="groupContent" style={{backgroundColor: "rgba(255, 255, 255, 0.5)", gap: "2vw", padding: "3vw", borderRadius: "2vw", marginTop: "1vw"}}>
                    {creatorInfo.songs ? creatorInfo.songs.map((song) =>
                        <SongCard key={song.songID} image={`http://localhost:3001/images/${song.songID}_song.webp`} songName={song.songName} artist={song.artist} onClick={() => {navigate(`/songs/${song.songID}`)}}/>
                    )
                    : <span style={{fontSize: '1vw', fontWeight: 'bold', color: "rgb(85, 85, 85)"}}>No songs uploaded by this creator yet</span>
                    }
                </div>
                <span style={{fontSize: '2vw', fontWeight: 'bold', marginTop: '3vw', color: "rgb(85, 85, 85)"}}>Creator's Chords</span>

                <div className="groupContent" style={{backgroundColor: "rgba(255, 255, 255, 0.5)", gap: "2vw", padding: "3vw", borderRadius: "2vw", marginTop: "1vw", marginBottom: "4vw"}}>
                    {creatorInfo.chords ? creatorInfo.chords.map((chord, index) =>
                        <div className="creatorChord" key={index}>

                            <ChordDiagram key={index} chord={chord}/>
                        </div>
                    )
                    : <span style={{fontSize: '1vw', fontWeight: 'bold', color: "rgb(85, 85, 85)"}}>No chords uploaded by this creator yet</span>
                    }
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
                    <MultiLineTextField value={request} className={"requestInput"} text={"write somthing..."} onChange={(value) => {
                        setRequest(value);
                    }}/>
                    <button ref={sectionRef} className="sendRequestButton" onClick={() => {
                        if(request.trim() === "" && !requestSent){
                            openPopup({header: "Request can't be empty", text: "Please write something in the request box before sending."});
                        }else if(userType === "guest" && !requestSent){
                            openPopup({header: "Login required", text: "You need to be logged in to send a request to the creator.", object: 
                                <button style={{width: "7vw", height: "3.5vw", fontSize: "1.1vw", fontWeight: "600", backgroundColor: "rgb(0, 0, 0)", color: "rgb(255, 255, 255)"}} onClick={() => {
                                    navigate("/loginSignup");
                                    closePopup();
                                }}>Login</button>
                            });
                        }else{
                            if(!requestSent){
                                sendRequestToCreator();
                                setRequest("");
                            }
                            setRequestSent(!requestSent);
                        }
                    }}>{requestSent ? "Send again" : "Send request"}</button>
                </div>
            </div>
        </div>
    );
};
export default CreatorPage;