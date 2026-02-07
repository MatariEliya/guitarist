import "./creators.css"

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../../globalsIndex";
import TextField from "../../../components/textField/textField";

import defaultCreatorImg from '../../images/guitarPlayer.png';

const Creators = () => {
    const { userType, setUserType } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [profileCard, setProfileCard] = useState({creatorName: "Eliya matari", image: "https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", tags: ["chill", "pop", "Responds to requests"]})
    //const [profileCard, setProfileCard] = useState()
    const [publicProfileCard, setPublicProfileCard] = useState([
    {creatorName: "Eliya matari", image: "https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", tags: ["chill", "pop", "Responds to requests"], profileID: "hdtjhfjgl"},
  ])
    return (
      <div className="container">
        <button onClick={() => setUserType(userType === "guest" ? "member" : userType === "member" ? "creator" : "guest")}>
          {userType === "guest" ? "Guest Mode" : userType === "member" ? "Member Mode" : "Creator Mode"}
        </button>
        <div className='columnLayout' style={{width: "90%", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "2vw"}}>
          {userType === "creator"? <div className='rowContent' style={{margin: "2vw"}}>
            {profileCard?
            <ProfileCard info={profileCard} onClick={() => navigate("/createCreatorProfile")}/>
          : <button className="createProfileCard" onClick={() => navigate("/createCreatorProfile")}>+</button>}
          </div> : null}
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "2vw", margin: "0", padding: "2vw", width: "100%"}}>
            <TextField text={"Search Creators..."} className={"searchCreatorsInput"} onChange={(value) => {console.log(value)}}/>
            
            <div className="groupContent" style={{position: "relative", gap: "2vw", padding: "3vw", borderRadius: "2vw", marginTop: "4vw"}}>
              {publicProfileCard.map((pubProfileCard) =>
                <ProfileCard key={pubProfileCard.profileID} info={pubProfileCard} onClick={() => navigate(`/creators/${pubProfileCard.profileID}`)}/>
              )}
            </div>
          </div>
        </div>
      </div>

    );
};

export default Creators;

export function ProfileCard({info = { image: null, creatorName: "", tags: [] }, className = "", onClick}){
  const imageSrc = info.image && info.image.trim() !== "" ? info.image : defaultCreatorImg;
  return(
    <button className={`profileCard ${className || ""}`} onClick={onClick}>
      <img src={imageSrc} className="profileCardImg" onError={(e) => {
        e.target.src = defaultCreatorImg;
      }}/>
      <div className="profileCardInfo">
        <span className="creatorName">{info.creatorName}</span>
        <span className="creatorTag">{info.tags.map((tag) => `#${tag} `)}</span>
      </div>
    </button>
  )
}
