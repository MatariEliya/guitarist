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
                  <p style={{fontSize: "1.2vw", fontWeight: "500", whiteSpace: "pre-line"}}>
                    {popupInfo.text}
                  </p>
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

