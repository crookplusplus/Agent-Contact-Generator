import { React, useState } from "react";
import UserSidebar from "../Components/UserSidebar";
import UserContactsTable from "../Components/UserContactsTable";
import ListSelectorButton from "../Components/ListSelectorButton";
import ContactHighlights from "../Components/ContactHighlights";
import UserMenuSm from "../Components/UserMenuSm";
import { useListContext } from "../Hooks/useListContext";

const UserContactsPage = () => {
  const [displayDash, setDisplayDash] = useState(true);
  const { listState } = useListContext();

  const toggleDisplayDash = () => {
    setDisplayDash(!displayDash);
  };

  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
        <div className="container bg-color2 rounded-lg p-6">
          <div className="flex flex-wrap">
            <h1 className="text-color3 m-5 font-bold font-rocksalt">
              Your Contacts:
            </h1>
            {listState.focus && <ListSelectorButton />}
            <button
              onClick={toggleDisplayDash}
              className="text-color4 bg-color1 hover:bg-color4 hover:text-color1
            font-medium rounded-lg p-2 my-4"
            >
              {displayDash ? "Hide List Info" : "Show List Info"}
            </button>
          </div>
          {/**Highlights */}
          {displayDash && (
            <div>
              <ContactHighlights />
            </div>
          )}
          {/**Table of Lists pulled */}
          <UserContactsTable />
        </div>
      </main>
    </>
  );
};

export default UserContactsPage;
