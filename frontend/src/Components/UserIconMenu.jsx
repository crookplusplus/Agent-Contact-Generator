import React from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";
import { useLogout } from "../Hooks/useLogout";
import { BiUser } from "react-icons/bi";
import { HiLogout, HiLogin, HiOutlinePencil } from "react-icons/hi";
import { Dropdown, DropdownItem } from "flowbite-react";

const UserIconMenu = () => {
  const { userState } = useAuthUserContext();
  const { listDispatch } = useListContext();
  const { logout, isLoading, setIsLoading } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      listDispatch({ type: "clearAll" });
      setIsLoading(false);
    } catch (error) {
      console.log("Error logging out");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dropdown
        className="bg-color2 font-pop"
        label={
          <BiUser className="text-white w-6 h-6 hover:scale-150 hover:text-color4 duration-500" />
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Header>
          <span className="block text-sm font-pop text-color3 hover:text-color5">
            {userState.username}
          </span>
        </Dropdown.Header>
        {!userState.token && (
          <DropdownItem
            className="bg-color2 text-color3 hover:text-color5"
            icon={HiOutlinePencil}
            to="/signup"
          >
            Sign Up
          </DropdownItem>
        )}
        {!userState.token && (
          <DropdownItem
            className="bg-color2 text-color3 hover:text-color5"
            icon={HiLogin}
            to="/login"
          >
            Login
          </DropdownItem>
        )}
        {userState.token && (
          <Dropdown.Item
            className="bg-color2 text-color3 hover:text-color5"
            icon={HiLogout}
            onClick={() => handleLogout()}
          >
            Logout
          </Dropdown.Item>
        )}
      </Dropdown>
    </div>
  );
};

export default UserIconMenu;
