import React, { useEffect, useState } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { userState, userDispatch } = useAuthUserContext();
  const { cartState, clearCart } = useCartContext();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

  const handleCheckout = async () => {
    let value = cartState;
    setIsLoading(true);
    if (value > 100) {
      value = 100;
    }
    
    const response = await fetch("/api/user/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
        },
      body: JSON.stringify({ value }),
    });
    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
      const { mssg, credits } = data;
      userDispatch({ type: "CREDITS", payload: credits });
      clearCart();
      console.log(mssg);
      navigate("/checkout");
    }
    else {
      const { error } = data;
      setError(error);
      setTimeout(() => {
        clearCart();
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-1">
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
          <Button className="bg-color4 text-color2 hover:bg-color5 mt-4"
            onClick={()=> handleCheckout()}
            disabled={isLoading}
          >
            Checkout
          </Button>
        </div>
      </div>
      <Modal show={error} size="sm" onClose={() => setError(null)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-error" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              {error}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartSummary;
