import React, { useEffect, useState, useRef } from "react";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import CartMenu from "./CartMenu";
import UserIconMenu from "./UserIconMenu";

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
      <div className="md:flex items-center justify-between py-6 md:px-10 px-7">
        <div className="font-bold text-xl text-color3 hover:text-color4 duration-500 cursor-pointer flex items-center font-rocksalt">
          <span className="mr-1 ">
            <div className="w-20 h-20">
              <img src="../src/assets/nnneon.svg" alt="AquaintLogo" />
            </div>
          </span>
          <Link to="/">ACQUIANT</Link>
        </div>
        <div className="w-16 absolute md:hidden right-28 sm:right-32 top-10">
          <CartMenu />
        </div>
        <div className="w-16 absolute md:hidden right-12 sm:right-14 top-14">
          <UserIconMenu />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-2xl absolute right-8 top-14  cursor-pointer md:hidden "
        >
          {open ? (
            <RiCloseLine className="font-bold text-white hover:text-color4 hover:scale-150 duration-500 transform" />
          ) : (
            <TiThMenu className="text-white hover:text-color4 hover:scale-150 duration-500 transform" />
          )}
        </div>
        <ul
          ref={menuRef}
          className={`md:flex md:items-center pb-0 md:static md:z-auto z-[-1] left-0 w-28 md:w-auto md:opacity-100 pl-9 ${
            open
              ? "transition-max-h-ease-in duration-300 max-h-[500px] opacity-100 z-50"
              : " max-h-0 opacity-0 z-[-1]"
          }
          `}
        >
          <MenuItem site={userState.token ? "/welcome" : "/"} name="HOME" />
          <MenuItem site="/about" name="ABOUT" />
          <MenuItem site="/services" name="SERVICES" />
          {/**!userState.token && <MenuItem site="/signup" name="SIGNUP" />*/}
          {/**!userState.token && <MenuItem site="/login" name="LOGIN" />*/}
          {/**This is just for practice and making backend server calls */}
          {/**{userState.token && <MenuItem site="/test" name="TEST"/>}*/}
          {/**{userState.token && <MenuItem site="/data" name="DATA" />}*/}
          <div className="hidden md:flex">
            <CartMenu />
          </div>
          <div className="hidden md:flex">
          <UserIconMenu/>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
