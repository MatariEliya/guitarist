import "./seeAllPage.css"

import { jwtDecode } from "jwt-decode";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePopup } from "../../../components/Popup/usePopup";
import { GlobalContext } from "../../../globalsIndex";
import { useContext } from "react";


import { ChordDiagram } from "../chords/chords";
import { SongCard } from "../songs/songs";
import { ReturnSvg, TrashSvg } from "../../svg/svg";



function SeeAllPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    const {openPopup} = usePopup();
    const {userType} = useContext(GlobalContext);


    const [serverData, setServerData] = useState([]);

    console.log(serverData);

    useEffect(() => {
        async function fetchData() {
            const token = sessionStorage.getItem("token")
            if(!token){
                navigate("/login")
                return false;
            }
            const user_id = jwtDecode(token)?.user_id


            if(userType === "creator"){
                if(type === "requests"){
                    const data = await fetch("http://localhost:3001/creators/requests", {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });
                    const requestsData = await data.json();
                    if(data.ok){
                        setServerData(requestsData);
                    }
                }else if(type === "createdChords"){
                    const data = await fetch(`http://localhost:3001/chords/${user_id}`, {
                        method: "GET"
                    });
                    const chordsData = await data.json();
                    if(data.ok){
                        setServerData(chordsData);
                    }
                }else if(type === "createdSongs"){
                    console.log(user_id)
                    const data = await fetch(`http://localhost:3001/songs/byCreator/${user_id}`, {
                        method: "GET"
                    });
                    const songsData = await data.json();
                    if(data.ok){
                        setServerData(songsData);
                    }
                }else {
                    openPopup({text: "We couldn't find what you were looking for"})
                }
            }
        }
        fetchData();
    }, [type, userType])

    async function handleDelete(item) {
        console.log(item);
        if(type === "createdChords"){
            const response = await fetch(`http://localhost:3001/chords/${item.chordId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });
            if(response.ok){
                setServerData(prevData => prevData.filter(chord => chord.chordId !== item.chordId));
            }
        }else if(type === "createdSongs"){
            const response = await fetch(`http://localhost:3001/songs/${item.songID}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });
            if(response.ok){
                setServerData(prevData => prevData.filter(song => song.songID !== item.songID));
            }
        }else if(type === "requests"){
            const response = await fetch(`http://localhost:3001/creators/requests/${item.requestID}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });
            if(response.ok){
                setServerData(prevData => prevData.filter(request => request.requestID !== item.requestID));
            }
        }
    }

    return(
        <div className="container">
            <div className="columnLayout" style={{position: "relative", width: "90%", backgroundColor: "#ffffff80", borderRadius: "3vw"}}>
                <button
                    className="backButton"
                    style={{top: "1vw", left: "2vw"}}
                    onClick={()=>navigate("/profile")}
                >
                    <ReturnSvg/>
                </button>
                <span style={{color: "white", fontSize: "3vw", fontWeight: "700"}}>{
                type == "createdChords" ? "your chords" : 
                type == "createdSongs" ? "Your Songs" : 
                type == "requests" ? "Requests" :
                "We couldn't find what you were looking for"
            
                }</span>
                <div className="groupContent" style={{padding: "1.3vw", gap: "1vw"}}>
                    {serverData.length > 0 ?
                        serverData.map((item, index) => {
                            return(
                                <div key={index} >
                                    <button style={{width: "100%", height: "3.5vw", backgroundColor: "rgb(212, 73, 73)", borderRadius: "1vw", marginBottom: "0.5vw"}} onClick={() => {
                                        handleDelete(item);
                                    }}>
                                        <TrashSvg width={"3vw"} height={"3vw"} />
                                    </button>
                                    {type === "createdChords" ?
                                        <div style={{backgroundColor: "white", width: "11.5vw", height: "16.5vw", borderRadius: "1vw"}}>
                                            <ChordDiagram chord={item} fontSize={"1.1vw"}/>
                                        </div>
                                    : type === "createdSongs" ?
                                        <SongCard className={"profilePageSongCard"} image={`http://localhost:3001/images/${item.songID}_song.webp`} songName={item.songName} artist={item.artist} fontSize={"1.6"} onClick={() => navigate(`/songs/${item.songID}`)}/>
                                    : <button className="requestCard" onClick={() => {
                                        openPopup({text: item.request})
                                    }}>
                                        <p style={{whiteSpace: "pre-line", display: "block", fontSize: "0.9vw", fontWeight: "500", margin: "0"}}>{item.request}</p>
                                    </button>}
                                </div>
                            )
                        })
                    :
                        <div className="centerLayout" style={{width: "100%", backgroundColor: "white", height: "10vw", borderRadius: "3vw", }}>
                            <span style={{fontSize: "1.5vw", fontWeight: "600", color: "#585858"}}>It's look like you don't have any {
                            type == "createdChords" ? "created chords" : 
                            type == "createdSongs" ? "created songs" :
                            "requests"}</span>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
export default SeeAllPage
