import React, { useState, useEffect } from "react";
import UserSidebar from "../Components/UserSidebar";
import UserMenuSm from "../Components/UserMenuSm";
import NoRedeem from "../Components/NoRedeem";
import Redeem from "../Components/Redeem";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { userCreditCheck } from "../Hooks/useRedeemInfo";

const RedeemPage = () => {
  const { userState, userDispatch } = useAuthUserContext();

  useEffect(() => {
    const checkCredits = async () => {
      const response = await userCreditCheck(userState);
      const credits = response.credits;
      userDispatch({ type: "CREDITS", payload: { credits } });
    };
    checkCredits();
  }, [userState.credits]);

  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
        <div className="container h-full bg-color2 rounded-lg p-6">
          {userState.credits !== null && userState.credits !== 0 && (
            <h1 className="text-color3 mb-8 text-3xl font-bold font-pop">
              You have{" "}
              <span className="underline decoration-4 decoration-color4">
                {userState.credits}
              </span>{" "}
              credits to redeem!
            </h1>
          )}
          {userState.credits !== null && userState.credits !== 0 ? (
            <Redeem />
          ) : (
            <NoRedeem />
          )}
        </div>
      </main>
    </>
  );
};

export default RedeemPage;
