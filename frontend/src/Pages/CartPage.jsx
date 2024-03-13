import React from "react";
import UserSidebar from "../Components/UserSidebar";
import UserMenuSm from "../Components/UserMenuSm";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import CartUI from "../Components/CartUI";

const CartPage = () => {
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
                {userState.username}'s' Cart:
            </h1>
            <CartUI />
        </div>
      </main>
    </>
  );
};

export default CartPage;
