import React, { useEffect, useState } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import { Button } from "flowbite-react";

const CartSummary = () => {
  const { cartState } = useCartContext();
  const [price, setPrice] = useState(0);

  useEffect(() => {}, []);

  useEffect(() => {
    let value = cartState;
    switch (true) {
      case cartState <= 0:
        setPrice(0);
        break;
      case cartState < 100 && cartState > 0:
        setPrice(value * 0.25 - 0.01);
        break;
      case cartState >= 100 && cartState < 500:
        setPrice(value * 0.2 - 0.01);
        break;
      case cartState >= 500:
        setPrice(value * 0.1 - 0.01);
        break;
      default:
        setPrice(0);
    }
  }, [cartState]);

  return (
    <div>
      <div className="bg-color3 rounded-lg">
        <div className="flex flex-col p-6">
          <h2 className="font-pop text-xl mb-4">Summary</h2>
          <span className="mb-2 underline">Subtotal:</span>
          <div className="flex flex-row justify-between">
            <span>{cartState} contacts</span>
            <span>${price}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Tax (added at checkout)</span>
            <span>$0.00</span>
          </div>
          <hr className="border-t border-color3 my-4"></hr>
          <div className="flex flex-row justify-between">
            <span className="font-bold">Balance: </span>
            <span className="font-bold">${price}</span>
          </div>
            <Button className="bg-color4 text-color2 hover:bg-color5 mt-4">
                Checkout
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
