import React from "react";
import UserSidebar from "./UserSidebar";
import UserListTable from "./UserListTable";
import UserHighlights from "./UserHighlights";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";

const UserDash = () => {
  const { userState } = useAuthUserContext();

  return (
    <>
      <UserSidebar />
      <main className="flex rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="container bg-color2 rounded-lg p-6">
          <h1 className="text-color3 mb-8 font-bold font-rocksalt">
            Hello, {userState.username}!
          </h1>
          {/**Highlights */}
          <UserHighlights />
          {/**Table of Lists pulled */}
          <UserListTable />
        </div>
      </main>
    </>
  );
};

export default UserDash;
