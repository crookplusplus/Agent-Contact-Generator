import React from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import LogoutButton from "./LogoutButton";
import { BiUser } from "react-icons/bi";
import { Dropdown } from "flowbite-react";

const UserIconMenu = () => {
  const { userState } = useAuthUserContext();

  return (
    <div>
      {userState.token && (
        <Dropdown
          className="bg-color3"
          label={
            <BiUser className="text-white w-6 h-6 hover:scale-150 hover:text-color4 duration-500" />
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Header>
            <span className="block text-sm">{userState.username}</span>
          </Dropdown.Header>
          <Dropdown.Item className="bg-color3">
            <LogoutButton />
          </Dropdown.Item>
        </Dropdown>
      )}
    </div>
  );
};

export default UserIconMenu;
