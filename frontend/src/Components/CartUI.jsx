import React, { useState } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import PicCaro from "./PicCaro";
import UpSellCard from "./UpSellCard";
import CartSummary from "./CartSummary";
import CartDisplay from "./CartDisplay";

const CartUI = () => {
  const { cartState } = useCartContext();
  const [sumPos, setSumPos] = useState(0);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-4">
      <div className="lg:col-span-4">
        <UpSellCard />
        <div className="flex flex-col">
          <hr className="border-t border-color3 my-10"></hr>
          <CartDisplay />
          <hr className="border-t border-color3 my-10"></hr>
        </div>
      </div>
      <div className="lg:col-span-2">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartUI;
