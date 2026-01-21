import React, { useState } from "react";
import "./uploader.css"
import { UploaderSvg } from "../../assets/svg";
import { compressImage } from "../../assets/pages/createSong/compressImage";


function Uploader({onImageUpload}) {
    const [image, setImage] = useState(null)
    const previewUrl = image ? URL.createObjectURL(image) : null;

    return (
        !image ? <label className="custum-file-upload">
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
