import React from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useLogout } from "../Hooks/useLogout";

const LogoutButton = () => {
  const { userState } = useAuthUserContext();
  const { logout, isLoading } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();

    //await logout();
    try {
      await logout();
    }  catch(error) {
      console.log('Error logging out');
      isLoading(false);
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
