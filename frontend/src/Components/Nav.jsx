import React, { useEffect, useState, useRef } from "react";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import styles from "./Nav.module.css";

const Nav = () => {
  let [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { userState } = useAuthUserContext();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <span className={styles.logoContainer}>
            <div className={styles.logoImage}>
              <img src="../src/assets/nnneon.svg" alt="AquaintLogo" />
            </div>
          </span>
          <Link className={styles.logoText} to="/">
            ACQUIANT
          </Link>
        </div>
        <div onClick={() => setOpen(!open)} className={styles.menuButton}>
          {open ? (
            <RiCloseLine className={styles.menuIcon} />
          ) : (
            <TiThMenu className={styles.menuIcon} />
          )}
        </div>
        <ul
          ref={menuRef}
          className={`${styles.menu} ${
            open ? styles.menuOpen : styles.menuClosed
          }`}
        >
          <MenuItem site="/" name="HOME" />
          <MenuItem site="/about" name="ABOUT" />
          <MenuItem site="/services" name="SERVICES" />
          <MenuItem site="/login" name="LOGIN" />
          <MenuItem site="/signup" name="SIGNUP" />
          {/**This is just for practice and making backend server calls */}
          {userState.token && <MenuItem site="/test" name="TEST" />}
          {userState.token && <MenuItem site="/data" name="DATA" />}
          <LogoutButton />
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
