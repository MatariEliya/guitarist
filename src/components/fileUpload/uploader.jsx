import React, { useState, useEffect } from "react";
import "./uploader.css"
import { UploaderSvg } from "../../assets/svg/svg";
import { compressImage } from "./compressImage";
import { GlobalContext } from "../../globalsIndex";


function Uploader({onImageUpload, defaultImage, setIsDefaultImage}) {
    const [image, setImage] = useState(null)
    const [defultImageStats, setDefultImageStats] = useState(defaultImage);
    const previewUrl = image ? URL.createObjectURL(image) : defultImageStats;

    
    useEffect(() => {
        setDefultImageStats(defaultImage);
    }, [defaultImage]);

    return (
        !previewUrl ? <label className="custum-file-upload">
            <div className="icon">
                <UploaderSvg/>
            </div>
            <div className="text">
                <span style={{fontSize: "1vw", fontWeight: "500"}}>Click to upload image</span>
            </div>
            <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const resizedImage = await compressImage(file, 400, 400);
                        setImage(resizedImage)

                        // צור כתובת זמנית להצגה
                        onImageUpload(resizedImage); // שליחת הקובץ לאבא
                    } else {
                        setImage(null)
                        onImageUpload(null);
                    }
                }}
            />
        </label>:(
            <button style={{padding: "0", width: "20vw", height: "20vw", background: "none", borderRadius: "2vw"}} onClick={() => {
                setImage(null)
                setDefultImageStats(null)
                onImageUpload(null);
                setIsDefaultImage ? setIsDefaultImage(false) : null;
            }}>
                <img 
                    src={previewUrl} 
                    alt="preview" 
                    style={{width: "100%", height: "100%", borderRadius: "2vw"}}
                />
            </button>
        )
    );
}

export default Uploader
