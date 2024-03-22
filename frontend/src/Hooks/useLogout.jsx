import { useState, useEffect } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { userState, userDispatch } = useAuthUserContext();

  const logout = async () => {
    setIsLoading(true);
    //setError(null);

    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json", 
      "Authorization": `Bearer ${userState.token}`},
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json.mssg);
      //set the user info in the context
      userDispatch({ type: "LOGOUT" });
    }
  };
  return { logout, isLoading, setIsLoading };
};
