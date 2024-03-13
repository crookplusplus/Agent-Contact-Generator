import React from "react";
import UserSidebar from "../Components/UserSidebar";
import UserListTable from "../Components/UserListTable";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import UserMenuSm from "../Components/UserMenuSm";

const UserListPage = () => {
  const { userState } = useAuthUserContext();

  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
        <div className="container bg-color2 rounded-lg p-6">
          <h1 className="text-color3 mb-8 font-bold font-rocksalt">
            Your Lists of Contacts:
          </h1>
          {/**Table of Lists pulled */}
          <UserListTable />
        </div>
      </main>
    </>
  );
};

export default UserListPage;
