import "./creators.css"

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../../globalsIndex";
import TextField from "../../../components/textField/textField";

import defaultCreatorImg from '../../images/guitarPlayer.png';

function Creators (){

  const { userType, username} = useContext(GlobalContext);
  const navigate = useNavigate();

  const [profileCard, setProfileCard] = useState(null)
  //const [profileCard, setProfileCard] = useState()
  const [publicProfileCard, setPublicProfileCard] = useState([
    {creatorName: "EliyaMatari", image: `http://localhost:3001/images/EliyaMatari_creatorCard.webp`, tag1: "chill", tag2: "pop", tag3: "Responds to requests", profileID: "hdtjhfjgl"},
  ])

  
  useEffect(() => {

    const fetchData = async () => {
      const profiles = await fetch("http://localhost:3001/creators", {
        method: "GET"
      });
      const profilesData = await profiles.json();
      setPublicProfileCard(profilesData);

      if(userType != "creator") return
      const token = sessionStorage.getItem("token");
      try{
        const response = await fetch("http://localhost:3001/creators/creatorCard", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        });
        const data = await response.json()
        if(data?.creatorName){
          setProfileCard({creatorName: data.creatorName, image: `http://localhost:3001/images/${username}_creator_card.webp`, tag1: data.tag1, tag2: data.tag2, tag3: data.tag3})
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [username]);


  return (
    <div className="container">
      <div className='columnLayout' style={{width: "90%", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "2vw", margin: "1vw", padding: "2vw"}}>
        {userType === "creator"? <div className='rowContent' style={{margin: "2vw"}}>
          {profileCard?
          <ProfileCard info={profileCard} onClick={() => navigate("/createCreatorProfile")}/>
        : <button className="createProfileCard" onClick={() => navigate("/createCreatorProfile")}>+</button>}
        </div> : null}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "2vw", margin: "0", padding: "2vw", width: "100%"}}>          
          <div className="groupContent" style={{position: "relative", gap: "2vw", padding: "0 2vw", borderRadius: "2vw"}}>
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

export function ProfileCard({info = {creatorName: "", tag1: "", tag2: "", tag3: ""}, className = "", onClick}){
  const image = `http://localhost:3001/images/${info.creatorName}_creator_card.webp`;
  return(
    <button className={`profileCard ${className || ""}`} onClick={onClick}>
      <img src={image} className="profileCardImg" onError={(e) => {
        e.target.src = defaultCreatorImg;
      }}/>
      <div className="profileCardInfo">
        <span className="creatorName">{info.creatorName}</span>
        <span className="creatorTag">{[info.tag1, info.tag2, info.tag3].filter(Boolean).join(", ")}</span>
      </div>
    </button>
  )
}
