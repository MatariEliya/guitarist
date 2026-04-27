import "./profilePage.css";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


import { GlobalContext } from "../../../globalsIndex";
import { usePopup } from "../../../components/Popup/usePopup";
import { ProfileCard } from "../creators/creators";
import { SongCard } from "../songs/songs";
import { ChordDiagram } from "../chords/chords";
import { ReturnSvg, SeeAllSvg } from "../../svg/svg";

function ProfilePage() {
  const navigate = useNavigate();
  const {openPopup} = usePopup();
  const { userType , setUserType} = useContext(GlobalContext);

  const [requests, setRequests] = useState(["Request 1", "Request 2 ugiu hgoihoiho ihp ppo[ po\njh\n \n dfdsd\n\n\n gfghs\nsadffsafasfasfsafsafsafsafsa asfasf sfasaf f sf asf\n s \nfa \ndflg ", "Request 3", "khgku"]); // Placeholder for user's requests

  const [creatorInfo, setCreatorInfo] = useState({name: "EliyaMatari", bio: "This is the creator bio.\nHere you can write about yourself, your music style, experience, and anything else you'd like to share with your audience.", 
      hasCreatorCard: false,
      songs: [
          {songID: "gtg8t67v", songName: "I'm still standing", artist: "Elton John", straredSong: true},
          {songID: "uh7yiuhu", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}
      ], 
      chords: [{name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
          {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
          {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
          {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
          {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false}
      ]
  });
  console.log(creatorInfo);


  useEffect( () => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");


      //מוציאים את הנתונים של הפרופיל
      try{
        const requestResponse = await fetch("http://localhost:3001/creators/requests", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const requestsData = await requestResponse.json();
        if(requestResponse.ok){
            setRequests(requestsData);
        }
        const response = await fetch(`http://localhost:3001/creators/creatorInfo`, {
            headers: {
                Authorization: "Bearer " + token
            },
            method: "GET"           
        });
        const data = await response.json()
        console.log(data);
        if(response.ok){
          setCreatorInfo(data);
        } else {
          console.log("Server error:", data?.message);
        }

      } catch (error) {
        console.error(error);
      }
    };
    if(userType === "creator"){
      fetchData();
    }
  }, [userType]);

  
  return (
    <div className="container">
      {userType === "guest" ? (
        // Guest view
        <div className="columnLayout" style={{borderRadius: "2vw", padding: "2vw", backgroundColor: "rgba(255, 255, 255, 0.5)", marginTop: "2vw", width: "40%"}}>
          <div className="columnLayout">
            <span style={{fontSize: "3vw", fontWeight: "700"}}>Guest Profile</span>
            <span style={{fontSize: "1vw", fontWeight: "400"}}>Welcome, Guest! Please log in or sign up to access more features.</span>
            <div className="rowContent" style={{marginTop: "1vw"}}>
              <button style={{width: "8vw", height: "3.5vw"}} onClick={() => navigate("/loginSignup")}>Login/signup</button>
              <button style={{width: "8vw", height: "3.5vw", backgroundColor: "#ff4d4d"}} onClick={() => navigate("/")}>Back Home</button>
            </div>
          </div>
        </div>
      ) : (
        // conected user view
        <div className="columnLayout" style={{width: "90%", borderRadius: "2vw", paddingTop: "3vw", backgroundColor: "#ffffff3f", position: "relative"}}>
          <button
            className="backButton"
            style={{top: "1vw", left: "2vw"}}
            onClick={()=>navigate("/")}
          >
            <ReturnSvg/>
          </button>
          {userType === "creator" ? (
            <>
              {/*profile section */}
              <span style={{fontSize: "2vw", fontWeight: "700", marginBottom: "1vw"}}>Create and edit your creator profile</span>
              {creatorInfo?.creatorId ? (
                <ProfileCard info={{creatorName: creatorInfo.creatorName, tag1: creatorInfo.tag1, tag2: creatorInfo.tag2, tag3: creatorInfo.tag3}} onClick={() => navigate("/createCreatorProfile")}/>
              ) : (
                <button className="createProfileCard" onClick={() => navigate("/createCreatorProfile")}>+</button>
              )}
              {/*requests section */}
              <div className="columnLayout" style={{position: "relative", width: "100%", borderRadius: "2vw", paddingTop: "2vw", marginTop: "2vw", backgroundColor: "#ffffff80"}}>
                <button className="seeAllButton" style={{top: "5vw"}} onClick={() => navigate("/seeAll/requests")}>
                  <SeeAllSvg/>
                </button>
                <span style={{fontSize: "2vw", fontWeight: "700", marginBottom: "1vw"}}>Your requests</span>
                {requests.length == 0 ? (
                  <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have no requests at the moment.</span>
                ) : (
                  <div className="rowContent" style={{minHeight: "10vw", position: "relative", gap: "2vw", padding: "3.25vw", borderRadius: "2vw"}}>
                    {requests.map((request, index) => (
                      index < 4 &&
                      <button key={index} className="requestCard" onClick={() => {
                        openPopup({text: request.request})
                      }}>
                        <p style={{whiteSpace: "pre-line", display: "block", fontSize: "0.9vw", fontWeight: "500", margin: "0"}}>{request.request}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Songs section */}
              <div className="columnLayout" style={{width: "100%", borderRadius: "2vw", paddingTop: "2vw", marginTop: "2vw", backgroundColor: "#ffffff80"}}>
                <span style={{fontSize: "3vw", fontWeight: "700", marginBottom: "1vw"}}>Your songs</span>

                    {creatorInfo.songs.length === 0 ? (
                      <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not created any songs yet.</span>
                    ) : (
                      <div style={{width: "100%", position: "relative"}}>
                        <button className="seeAllButton" onClick={() => navigate("/seeAll/createdSongs")}>
                          <SeeAllSvg/>
                        </button>
                        <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Created songs</span>
                        <div className="rowContent left" style={{minHeight: "20vw", position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                          {creatorInfo.songs.length > 0 && creatorInfo.songs.map((song, index) => (
                            index < 6 &&
                            <SongCard className={"profilePageSongCard"} key={index} image={`http://localhost:3001/images/${song.songID}_song.webp`} songName={song.songName} artist={song.artist} fontSize={"1.6"} onClick={() => navigate(`/songs/${song.songID}`)}/>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{width: "90%", height: "0.4vw", backgroundColor: "#ffffff", borderRadius: "0.4vw"}}/>
              </div>
              {/* Chords section */}
              <div className="columnLayout" style={{width: "100%", borderRadius: "2vw", paddingTop: "2vw", marginTop: "2vw", backgroundColor: "#ffffff80"}}>
                <span style={{fontSize: "3vw", fontWeight: "700", marginBottom: "1vw"}}>Your chords</span>

                    {creatorInfo.chords.length == 0 ? (
                      <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not created any chords yet.</span>
                    ) : creatorInfo.chords.length > 0 ? (
                      <div style={{width: "100%", position: "relative"}}>
                        <button className="seeAllButton" onClick={() => {
                          navigate("/seeAll/createdChords")
                        }}>
                          <SeeAllSvg/>
                        </button>
                        <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Created chords</span>
                        <div className="rowContent left" style={{position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                          {creatorInfo.chords.map((chord, index) => (
                            index < 6 &&
                            <div style={{backgroundColor: "white", width: "12vw", height: "16.5vw", borderRadius: "1vw"}} key={index}>
                              <ChordDiagram chord={chord} fontSize={"1.1vw"}/>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    ) : null}
                    <div style={{width: "90%", height: "0.4vw", backgroundColor: "#ffffff", borderRadius: "0.4vw"}}/>
              </div>
            </>
          ) : (
            <span style={{fontSize: "2vw", fontWeight: "700"}}>Already leaving us?</span>
          )}



          <div className="rowContent" style={{marginTop: "2vw", marginBottom: "2vw", gap: "2vw"}}>
            <button style={{width: "8vw", height: "3.5vw", backgroundColor: "rgb(102, 64, 114)"}} onClick={() => navigate("/")}>Back Home</button>
            <button style={{width: "8vw", height: "3.5vw", backgroundColor: "#ff3737"}} onClick={() => {
              setUserType("guest");
              sessionStorage.setItem("token", "")
              navigate("/")
            }}>Logout</button>
          </div>
        </div>)
      }
    </div>
  );
}
export default ProfilePage;