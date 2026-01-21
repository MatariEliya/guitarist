import React ,{ useContext } from "react";
import "./popup.css"

import { GlobalContext } from "../../globalsIndex";

function Popup () {
    const { popupInfo, setPopupInfo } = useContext(GlobalContext);

    return popupInfo.isOpen ? (
        <div className="popup-overlay">
            <div className="popup columnLayout">
                {popupInfo.header && (
                  <span style={{fontSize: "2vw", fontWeight: "700"}}>
                    {popupInfo.header}
                  </span>
                )}

                {popupInfo.text && (
                  <span style={{fontSize: "1vw", fontWeight: "400"}}>
                    {popupInfo.text}
                  </span>
                )}

                {popupInfo.object}

                <button className="popupCloseButton"
                    onClick={() => setPopupInfo(prev => ({
                        ...prev,
                        isOpen: false
                    }))}>
                    X
                </button>
            </div>
        </div>
    ) : null;
}

export default Popup

