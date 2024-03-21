import React, { useEffect, useState } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import { Dropdown } from "flowbite-react";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";


const ProPack = () => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-gold1 via-gold2 to-gold3 p-2">
      <div className="flex flex-col items-center justify-center border-solid border-4 rounded-lg border-gold4 shadow-2xl font-teko shadow-gold5 p-2 m-2">
        <h3 className="text-gold4 font-bold text-8xl m-4">PRO</h3>
        <h3 className="text-gold4 font-bold text-8xl m-4">PACK</h3>
      </div>
    </div>
  );
};

const StarterPack = () => {
    return (
      <div className="rounded-lg bg-gradient-to-r from-silver1 via-silver3 to-silver2 p-2">
        <div className="flex flex-col items-center justify-center border-solid border-4 rounded-lg border-silver5 shadow-2xl font-madimi shadow-whitesmoke p-2 m-2">
          <h3 className="text-silver5 font-bold text-6xl m-4">STARTER</h3>
          <h3 className="text-silver5 font-bold text-6xl m-4">PACK</h3>
        </div>
      </div>
    );
  };

const TrialPack = () => {
    return (
      <div className="rounded-lg bg-gradient-to-r from-color1 via-color2 to-color5 p-2">
        <div className="flex flex-col items-center justify-center border-solid border-4 rounded-lg border-silver shadow-2xl font-fjalla shadow-robinsegg p-2 m-2">
          <h3 className="text-timberwolf font-bold text-4xl m-4">TRIAL</h3>
          <h3 className="text-timberwolf font-bold text-4xl m-4">PACK</h3>
        </div>
      </div>
    );
  };

const CartDisplay = () => {
  const { cartState, addToCart, removeFromCart, clearCart } = useCartContext();
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState(0.25);
  const [pack, setPack] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (cartState <= 100) {
      setPrice(0.25);
      setPack(<TrialPack />);
      setInfo("Trial");
    }
    if (cartState < 500 && cartState >= 100) {
      setPrice(0.2);
      setPack(<StarterPack />);
      setInfo("Starter");
    }
    if (cartState >= 500) {
      setPrice(0.1);
      setPack(<ProPack />);
      setInfo("Pro");
    }
  }, [cartState]);

  const checkValue = (value) => {
    if (value === 20 || value === 100 || value === 500) {
      return true;
    } else {
      return false;
    }
  };

  const handleAdd = (value) => {
    if (checkValue(value)) {
      addToCart(value);
    }
  };
  const handleRemove = (value) => {
    if (checkValue(value)) {
      removeFromCart(value);
    }
  };
  const handleClear = () => {
    clearCart();
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="span-col-1">
            {pack}
        </div>
        <div className="flex flex-col justify-evenly font-pop text-whitesmoke">
          <div className="relative">
            <div className="absolute top-0 right-0 px-4">
              <BsTrash3 className="hover:cursor-pointer"
              onClick={()=>handleClear()}/>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{info} Pack Pricing</span>
            <span className="text-whitesmoke text-sm mt-6 mb-16">
              {cartState} Contacts
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between mr-4">
            <span className="flex text-whitesmoke text-sm mb-4 lg:mb-0">
              <span className="mr-2 mt-1">
                <AiOutlinePlusCircle
                  className="w-5 h-5 hover:text-color4"
                  onClick={() => handleAdd(number)}
                />
              </span>
              <span className="bg-color1 rounded-lg py-1 px-4">
                <Dropdown label={number} inline>
                  <Dropdown.Item onClick={() => setNumber(20)}>
                    20
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNumber(100)}>
                    100
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNumber(500)}>
                    500
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <span className="ml-2 mt-1">
                <AiOutlineMinusCircle
                  className="w-5 h-5 hover:text-color4"
                  onClick={() => handleRemove(number)}
                />
              </span>
            </span>
            <span className="text-sm sm:text-md">${price} per contact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
