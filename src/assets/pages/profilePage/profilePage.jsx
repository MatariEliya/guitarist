import "./profilePage.css";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";


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

  const profileCardInfo = {
    creatorName: "Eliya matari",
    image: "https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg",
    tags: ["chill", "pop", "Responds to requests"]
  };

  const requests = ["Request 1", "Request 2 ugiu hgoihoiho ihp ppo[ po\njh\n \n dfdsd\n\n\n gfghs\nsadffsafasfasfsafsafsafsafsa asfasf sfasaf f sf asf\n s \nfa \ndflg ", "Request 3", "khgku"]; // Placeholder for user's requests
  console.log(requests);
  console.log(requests.map(r => r.split("\n")));
  const createdSongs = [{songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
    {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}]; // Placeholder for user's created songs
  const staredSongs = [{songID: "gtg8t67v", image:"https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", songName: "I'm still standing", artist: "Elton John", straredSong: true},
    {songID: "uh7yiuhu", image:"https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", songName: "Beautiful things", artist: "Benson Boone", straredSong: false}]; // Placeholder for user's stared songs
  const createdChords = [{name: "G", numCapo: 1, fingers:[[2, 2, 0, true], [3, 1, 0, true], [3, 6, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "D", numCapo: 1, fingers:[[2, 4, 0, true], [2, 6, 0, true], [3, 5, 0, true], [0, 0, 0, false]] , mute:[1, 2], difficult: 0, starred: false},
        {name: "Em", numCapo: 1, fingers:[[0, 0, 0, false], [2, 2, 0, true], [2, 3, 0, true], [0, 0, 0, false]] , mute:[], difficult: 0, starred: false},
        {name: "Am", numCapo: 1, fingers:[[1, 5, 0, true], [2, 3, 0, true], [2, 4, 0, true], [0, 0, 0, false]] , mute:[1], difficult: 0, starred: false},
        {name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false}]; // Placeholder for user's created chords
  const staredChords = [{name: "F", numCapo: 1, fingers:[[1, 1, 5, true], [2, 4, 0, true], [3, 2, 0, true], [3, 3, 0, true]] , mute:[], difficult: 0, starred: false},
        {name: "Bm", numCapo: 1, fingers:[[2, 2, 4, true], [3, 5, 0, true], [4, 3, 0 ,true], [4 ,4 ,0 ,true]] , mute:[1], difficult: 1, starred: false}]; // Placeholder for user's stared chords

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
            onClick={()=>navigate(-1)}
          >
            <ReturnSvg/>
          </button>
          {/* Profile section - only for creators */}
          {userType === "creator" ? (
            <>
              <span style={{fontSize: "2vw", fontWeight: "700", marginBottom: "1vw"}}>Create and edit your creator profile</span>
              {profileCardInfo ? (
                <ProfileCard info={profileCardInfo} onClick={() => navigate("/createCreatorProfile")}/>
              ) : (
                <button className="createProfileCard" onClick={() => navigate("/createCreatorProfile")}>+</button>
              )}
            </>
          ) : (
            null
          )}

          {/* Requests section - only for creators */}
          {userType === "creator" ? (
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
                    <button key={index} className="requestCard" onClick={() => {
                      openPopup({text: request})
                    }}>
                      <p style={{whiteSpace: "pre-line", display: "block", fontSize: "0.9vw", fontWeight: "500", margin: "0"}}>{request}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
          

          {/* Songs section */}
          <div className="columnLayout" style={{width: "100%", borderRadius: "2vw", paddingTop: "2vw", marginTop: "2vw", backgroundColor: "#ffffff80"}}>
            <span style={{fontSize: "3vw", fontWeight: "700", marginBottom: "1vw"}}>Your songs</span>
          
            {/* Created songs section - only for creators */}
            {userType === "creator" ?
              <>
                {createdSongs.length == 0 ? (
                  <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not created any songs yet.</span>
                ) : createdSongs.length > 0 ? (
                  <div style={{width: "100%", position: "relative"}}>
                    <button className="seeAllButton" onClick={() => navigate("/seeAll/createdSongs")}>
                      <SeeAllSvg/>
                    </button>
                    <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Created songs</span>
                    <div className="rowContent left" style={{minHeight: "20vw", position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                      {createdSongs.map((song, index) => (
                        <SongCard className={"profilePageSongCard"} key={index} image={song.image} songName={song.songName} artist={song.artist} fontSize={"1.6"} onClick={() => navigate(`/songs/${song.songID}`)}/>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div style={{width: "90%", height: "0.4vw", backgroundColor: "#ffffff", borderRadius: "0.4vw"}}/>
              </>
            : null}
            {/* Stared songs section */}
            {staredSongs.length == 0 ? (
              <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not stared any songs yet.</span>
            ) : staredSongs.length > 0 ? (
              <div style={{width: "100%", position: "relative"}}>
                <button className="seeAllButton" onClick={() => navigate("/seeAll/staredSongs")}>
                  <SeeAllSvg/>
                </button>
                <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Stared songs</span>
                <div className="rowContent left" style={{position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                  {staredSongs.map((song, index) => (
                    <SongCard className={"profilePageSongCard"} key={index} image={song.image} songName={song.songName} artist={song.artist} fontSize={"1.6"} onClick={() => navigate(`/songs/${song.songID}`)}/>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Chords section */}
          <div className="columnLayout" style={{width: "100%", borderRadius: "2vw", paddingTop: "2vw", marginTop: "2vw", backgroundColor: "#ffffff80"}}>
            <span style={{fontSize: "3vw", fontWeight: "700", marginBottom: "1vw"}}>Your chords</span>
            {/* Created chords section - only for creators */}
            {userType === "creator" ?
              <>
                {createdChords.length == 0 ? (
                  <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not created any chords yet.</span>
                ) : createdChords.length > 0 ? (
                  <div style={{width: "100%", position: "relative"}}>
                    <button className="seeAllButton" onClick={() => {
                      navigate("/seeAll/createdChords")
                    }}>
                      <SeeAllSvg/>
                    </button>
                    <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Created chords</span>
                    <div className="rowContent left" style={{position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                      {createdChords.map((chord, index) => (
                        <div style={{backgroundColor: "white", width: "12vw", height: "16.5vw", borderRadius: "1vw"}} key={index}>
                          <ChordDiagram chord={chord} fontSize={"1.1vw"}/>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                ) : null}
                <div style={{width: "90%", height: "0.4vw", backgroundColor: "#ffffff", borderRadius: "0.4vw"}}/>
              </>
            : null}
            {/* Stared chords section */}
            {staredChords.length == 0 ? (
              <span style={{fontSize: "1vw", fontWeight: "500", color: "#363636"}}>You have not stared any chords yet.</span>
            ) : staredChords.length > 0 ? (
              <div style={{width: "100%", position: "relative"}}>
                <button className="seeAllButton" onClick={() => {
                      navigate("/seeAll/staredChords")
                    }}>
                      <SeeAllSvg/>
                    </button>
                <span style={{fontSize: "2vw", fontWeight: "700", color: "#363636"}}>Stared chords</span>
                <div className="rowContent left" style={{position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw"}}>
                  {staredChords.map((chord, index) => (
                    <div key={index} style={{backgroundColor: "white", width: "12vw", height: "16.5vw", borderRadius: "1vw"}}>
                      <ChordDiagram chord={chord} fontSize={"1.1vw"}/>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>


          {/* Logout and back home buttons */}
          <div className="rowContent" style={{marginTop: "2vw", marginBottom: "2vw", gap: "2vw"}}>
            <button style={{width: "8vw", height: "3.5vw", backgroundColor: "rgb(102, 64, 114)"}} onClick={() => navigate("/")}>Back Home</button>
            <button style={{width: "8vw", height: "3.5vw", backgroundColor: "#ff3737"}} onClick={() => {
              setUserType("guest");
              navigate("/")
            }}>Logout</button>
          </div>
        </div>)}
    </div>
  );
}
export default ProfilePage;