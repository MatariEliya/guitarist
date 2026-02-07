import "./createCreatorProfile.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import Uploader from "../../../components/fileUpload/uploader";
import TextField from "../../../components/textField/textField";
import MultiLineTextField from "../../../components/MultiLineTextField/multiLineTextField";
import { YoutubeSvg, InstegramSvg, TikTokSvg } from "../../svg/svg";

function CreateCreatorProfile (){
    const navigate = useNavigate();
    return(
        <div className="container">
            <div className="columnLayout" style={{position: "relative", width: "90%", backgroundColor: "#ffffff80", borderRadius: "2vw", padding: "1.5vw 0", marginTop: "2vw"}}>
                <span style={{fontFamily: 'songsNamesFonts', fontSize: '3vw', color: "rgb(85, 85, 85)"}}>Create Your Creator Profile</span>
                <span style={{fontSize: '1.2vw', fontWeight: "500", margin: '1vw', color: "rgb(85, 85, 85)"}}>add a photo, tags and a bio to create your creator profile.</span>
                <Uploader onImageUpload={(image) => {console.log(image)}}/>
                <div className="rowContent" style={{marginTop: "1vw"}}>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw", alignItems: "center"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <YoutubeSvg/>
                        </div>
                        <TextField text={"YouTube link (optional)"} className={"creatorCNInput"}/>
                    </div>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <InstegramSvg/>
                        </div>
                        <TextField text={"Instagram link (optional)"} className={"creatorCNInput"}/>
                    </div>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <TikTokSvg/>
                        </div>
                        <TextField text={"TikTok link (optional)"} className={"creatorCNInput"}/>
                    </div>
                </div>
                <div className="rowContent">
                    <TextField text={"Tag 1 (optional)"} className={"creatorTagInput"}/>
                    <TextField text={"Tag 2 (optional)"} className={"creatorTagInput"}/>
                    <TextField text={"Tag 3 (optional)"} className={"creatorTagInput"}/>
                </div>
                <MultiLineTextField text={"Write your bio...(optional)"} className={"creatorBioInput"}/>
                <div className="rowContent" style={{marginTop: "3vw"}}>
                    <button style={{padding: "1vw 2vw", fontSize: "1.2vw", borderRadius: "1vw", border: "none", backgroundColor: "rgb(187, 48, 48)", cursor: "pointer", marginRight: "2vw"}} onClick={() => navigate(-1)}>Cancel</button>
                    <button style={{padding: "1vw 2vw", fontSize: "1.2vw", borderRadius: "1vw", border: "none", backgroundColor: "rgb(100, 149, 237)", color: "white", cursor: "pointer"}} onClick={() => navigate("/creators")}>Upload Profile</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCreatorProfile;