import React from "react";
import UserSidebar from "../Components/UserSidebar";
import UserMenuSm from "../Components/UserMenuSm";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useCartContext } from "../Hooks/useCartContext";
import CartUI from "../Components/CartUI";
import EmptyCart from "../Components/EmptyCart";

const CartPage = () => {
    const { userState } = useAuthUserContext();
    const { cartState } = useCartContext();

  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
        <div className="container bg-color2 rounded-lg p-6">
            <h1 className="text-color3 mb-8 font-bold font-rocksalt">
                {userState.username}'s' Cart :
            </h1>
            {cartState > 0 ? <CartUI /> : <EmptyCart />}
        </div>
      </main>
    </>
  );
};

export default CartPage;
