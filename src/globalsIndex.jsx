import { createContext, useState } from "react";

export const GlobalContext = createContext();


export function GlobalProvider({ children }) {
    const [isConnected, setIsConnected] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [popupInfo, setPopupInfo] = useState({header: "this is popup header", text: "this is popup text", isOpen: false})

    return (
        <GlobalContext.Provider value={{
            isAdmin, setIsAdmin,
            isConnected, setIsConnected,
            popupInfo, setPopupInfo
            }}>
            {children}
        </GlobalContext.Provider>
    );
}