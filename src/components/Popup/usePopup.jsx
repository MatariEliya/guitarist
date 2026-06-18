import { useContext, useCallback } from "react";
import { GlobalContext } from "../../globalsIndex";

export function usePopup() {
    const { setPopupInfo } = useContext(GlobalContext);

    const openPopup = useCallback(({ header, text, object}) => {
        setPopupInfo({ header, text, object, isOpen: true });
    }, [setPopupInfo]);

    const closePopup = useCallback(() => {
        setPopupInfo({header: "", text: "", object: null, isOpen: false});
    }, [setPopupInfo]);
    return { openPopup, closePopup };
}