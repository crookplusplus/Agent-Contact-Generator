import { useState, useEffect } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";

export const useContactInfo = () => {
    //for http calls
    const { userState } = useAuthUserContext();
    const { listState, listDispatch } = useListContext();
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    //used for debugging
    // useEffect(() => {
    //     console.log("ListContext state: ", listState);
    // }, [listState]);
    
    
    const getContactInfo = async () => {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/user/contacts/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`
            },
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setIsLoading(false);
            console.log(json.mssg);
            const contacts = json.allContacts;
            const totalContacts = json.totalContacts;
            //set the user info in the context
            listDispatch({ type: "updateContacts", payload: contacts });
            listDispatch({ type: "updateTotalContacts", payload: totalContacts });
            if (listState.focus === null && listState.lists.length > 0){
                listDispatch({ type: 'updateFocus', payload: listState.lists[0] });
            }
        }
    };


    return { getContactInfo, isLoading, error };
};
