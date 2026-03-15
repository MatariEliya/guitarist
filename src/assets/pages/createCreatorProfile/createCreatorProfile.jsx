import "./createCreatorProfile.css";

import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../components/Popup/usePopup";
import { useContext } from "react";
import { GlobalContext } from "../../../globalsIndex";


import Uploader from "../../../components/fileUpload/uploader";
import TextField from "../../../components/textField/textField";
import MultiLineTextField from "../../../components/MultiLineTextField/multiLineTextField";
import { YoutubeSvg, InstegramSvg, TikTokSvg } from "../../svg/svg";
import Menu from "../../../components/Menu/menu";



function CreateCreatorProfile (){
    const navigate = useNavigate();
    const {openPopup} = usePopup();

    const { username, userType } = useContext(GlobalContext);
    //התמונה

    const [defaultImage, setDefaultImage] = useState(null);

    const [image, setImage] = useState(null);
    //נתוני דאטה בייס
    const [form, setForm] = useState({
        creatorName: username,
        youtube: "",
        instagram: "",
        tiktok: "",
        tag1: "",
        tag2: "",
        tag3: "",
        bio: "",
        isPublic: false,
    });
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            try{
                const response = await fetch("http://localhost:3001/creators/creatorCard", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                const data = await response.json()
                if(data){
                    setForm({creatorName: data.creatorName, youtube: data.youtube, instagram: data.instagram, tiktok: data.tiktok, tag1: data.tag1, tag2: data.tag2, tag3: data.tag3, bio: data.bio, isPublic: data.is_public})
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])


    useEffect(() => {
        const url = `http://localhost:3001/images/${username}_creator_card.webp`;

        fetch(url, { method: "HEAD" })
            .then(async res => {
                if (res.ok) {
                    const file = await urlToFile(url, `${username}_creator_card.webp`, "image/webp");
                    setDefaultImage(url);
                    setImage(file);
                } else {
                    setDefaultImage(null);
                }
            })
            .catch(() => {
                setDefaultImage(null);
            });

    }, [username]);




    const handleUpload = async () => {

        const formData = new FormData();
        formData.append("Image", image);
        formData.append("creatorName", form.creatorName);
        formData.append("youtube", form.youtube);
        formData.append("instagram", form.instagram);
        formData.append("tiktok", form.tiktok);
        formData.append("tag1", form.tag1);
        formData.append("tag2", form.tag2);
        formData.append("tag3", form.tag3);
        formData.append("bio", form.bio);
        formData.append("isPublic", form.isPublic);

        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3001/creators/creatorCard", {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            });


            const data = await response.json();
            if(!response.ok) {
                console.log(data.message)
                openPopup({header: "Something went wrong", text: data.message || "Failed to update creator profile"})
                return false
            }
            return data ? true : false

        } catch(error) {
            console.error(error)
        }

    };


    if (userType !== "creator") {
        return (
            <div className="page-container">
                <span>You do not have permission to access this page.</span>
            </div>
        );
    }


    return(      
        <div className="container">
            <div className="columnLayout" style={{position: "relative", width: "90%", backgroundColor: "#ffffff80", borderRadius: "2vw", padding: "1.5vw 0", marginTop: "2vw"}}>
                <span style={{fontFamily: 'songsNamesFonts', fontSize: '2vw', color: "rgb(85, 85, 85)"}}>{form.creatorName}</span>
                <span style={{fontFamily: 'songsNamesFonts', fontSize: '3vw', color: "rgb(85, 85, 85)"}}>Create Your Creator Profile</span>
                <span style={{fontSize: '1.2vw', fontWeight: "500", margin: '1vw', color: "rgb(85, 85, 85)"}}>add a photo, tags and a bio to create your creator profile.</span>
                <Uploader onImageUpload={setImage} defaultImage={defaultImage} setDefaultImage={setDefaultImage}/>
                <div className="rowContent" style={{marginTop: "1vw"}}>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw", alignItems: "center"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <YoutubeSvg/>
                        </div>
                        <TextField text={"YouTube link (optional)"} value={form.youtube} className={"creatorCNInput"} maxLength={100} onChange={(value) => setForm(prev => ({ ...prev, youtube: value }))}/>
                    </div>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <InstegramSvg/>
                        </div>
                        <TextField text={"Instagram link (optional)"} value={form.instagram} className={"creatorCNInput"} maxLength={100} onChange={(value) => setForm(prev => ({ ...prev, instagram: value }))}/>
                    </div>
                    <div className="rowContent" style={{width: "auto", gap: "0.2vw"}}>
                        <div style={{width: "3vw", height: "3vw", backgroundColor: "#ffffff", borderRadius: "0.5vw"}}>
                            <TikTokSvg/>
                        </div>
                        <TextField text={"TikTok link (optional)"} value={form.tiktok} className={"creatorCNInput"} maxLength={100} onChange={(value) => setForm(prev => ({ ...prev, tiktok: value }))}/>
                    </div>
                </div>
                <div className="rowContent">
                    <TextField text={"Tag 1 (optional)"} value={form.tag1} className={"creatorTagInput"} maxLength={20} onChange={(value) => setForm(prev => ({ ...prev, tag1: value }))}/>
                    <TextField text={"Tag 2 (optional)"} value={form.tag2} className={"creatorTagInput"} maxLength={20} onChange={(value) => setForm(prev => ({ ...prev, tag2: value }))}/>
                    <TextField text={"Tag 3 (optional)"} value={form.tag3} className={"creatorTagInput"} maxLength={20} onChange={(value) => setForm(prev => ({ ...prev, tag3: value }))}/>
                </div>
                <MultiLineTextField text={"Write your bio...(optional)"} value={form.bio} className={"creatorBioInput"} onChange={(value) => setForm(prev => ({ ...prev, bio: value }))}/>
                <span style={{fontSize: '1.2vw', fontWeight: "600", color: "rgb(53, 53, 53)"}}>account status</span>
                <Menu location={form.isPublic} options={[{value: false, label: "hidden"}, {value: true, label: "public"}]} onChange={(value) => setForm(prev => ({...prev, isPublic: value}))}/>
                <span style={{fontSize: '0.8vw', fontWeight: "500", color: "rgb(0, 0, 0)"}}>When your account is hidden, other people will not be able to see your profile or send you messages. Other people will still be able to see the chords and songs you have uploaded.</span>
                <div className="rowContent" style={{marginTop: "3vw"}}>
                    <button style={{padding: "1vw 2vw", fontSize: "1.2vw", borderRadius: "1vw", border: "none", backgroundColor: "rgb(187, 48, 48)", cursor: "pointer", marginRight: "2vw"}} onClick={() => navigate(-1)}>Cancel</button>
                    <button style={{padding: "1vw 2vw", fontSize: "1.2vw", borderRadius: "1vw", border: "none", backgroundColor: "rgb(100, 149, 237)", color: "white", cursor: "pointer"}}
                        onClick={async () => {
                            const success = await handleUpload();
                            if (success) {
                                navigate("/creators");
                            }
                        }
                    }>Upload Profile</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCreatorProfile;


async function urlToFile(url, filename, mimeType) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
}