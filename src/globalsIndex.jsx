import { createContext, useState } from "react";

export const GlobalContext = createContext();


export function GlobalProvider({ children }) {
    const [isConnected, setIsConnected] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <GlobalContext.Provider value={{
            isAdmin, setIsAdmin,
            isConnected, setIsConnected,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}