import {useAuthUserContext} from "./useAuthUserContext";

export const useDeleteList = () => {
    const { userState } = useAuthUserContext();
    
    const deleteListCall = async (list_id) => {
        try{
            const response = await fetch("/api/user/list/delete", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userState.token}`
                },
                body: JSON.stringify({ list_id })
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error);
            }
            console.log(json.mssg);
        } catch (error) {
            console.error("Error deleting list");
        }
    };

    return { deleteListCall };
};