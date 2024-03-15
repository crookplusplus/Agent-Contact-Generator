import React from "react";
import { useCartContext } from "../Hooks/useCartContext";
import PicCaro from "./PicCaro";
import UpSellCard from "./UpSellCard";
import CartSummary from "./CartSummary";
import CartDisplay from "./CartDisplay";

const CartUI = () => {
  const { cartState } = useCartContext();

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4">
        <div className="flex flex-col">
          <UpSellCard />
          <hr className="border-t border-color3 my-4"></hr>
          <CartDisplay />
          <hr className="border-t border-color3 my-4"></hr>
        </div>
      </div>
      <div className="col-span-2">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartUI;
