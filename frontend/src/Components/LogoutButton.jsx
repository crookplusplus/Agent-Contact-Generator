import React from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";
import { useLogout } from "../Hooks/useLogout";

const LogoutButton = () => {
  const { userState } = useAuthUserContext();
  const { listDispatch } = useListContext();
  const { logout, isLoading, setIsLoading } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      listDispatch({ type: "clearAll" });
      setIsLoading(false);
    }  catch(error) {
      console.log('Error logging out');
      setIsLoading(false);
    }
  };
   

  return (
    <>
      {userState.token && <button 
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-color2 text-color4 font-sil font-extrabold text-3xl py-1 px-4 rounded hover:bg-color3 hover:text-color5 duration-300"
      >LOGOUT</button>}
    </>
  );
};

export default LogoutButton;
