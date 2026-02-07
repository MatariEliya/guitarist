import { createContext, useState } from "react";

export const GlobalContext = createContext();


export function GlobalProvider({ children }) {
    const [userType, setUserType] = useState("guest");
    const [popupInfo, setPopupInfo] = useState({header: "this is popup header", text: "this is popup text", isOpen: false})

    return (
        <GlobalContext.Provider value={{
            userType, setUserType,
            popupInfo, setPopupInfo
            }}>
            {children}
        </GlobalContext.Provider>
    );
}