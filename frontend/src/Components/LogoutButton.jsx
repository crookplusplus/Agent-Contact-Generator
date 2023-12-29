import React from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useLogout } from "../Hooks/useLogout";
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
  const { userState } = useAuthUserContext();
  const { logout, isLoading } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();

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
        className={styles.logoutButton}
      >LOGOUT</button>}
    </>
  );
};

export default LogoutButton;
