import { useContext } from "react";
import { ListContext } from "../Context/listContext";

export const useListContext = () => {
    const context = useContext(ListContext);

    if (!context){
        throw new Error(
            "useListContext must be used within ListProvider"
        );
    }
    return context;
};