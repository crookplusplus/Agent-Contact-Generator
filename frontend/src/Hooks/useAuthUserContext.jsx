import { useContext } from "react";
import { AuthUserContext } from "../Context/authUserContext";

export const useAuthUserContext = () => {
    const context = useContext(AuthUserContext);

    if (!context){
        throw new Error(
            "useAuthUserContext must be used within AuthUserProvider"
        );
    }
    return context;
};