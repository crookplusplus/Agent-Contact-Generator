import React, { useState, useEffect } from "react";
import { useCartContext } from "../Hooks/useCartContext";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const Bundles = () => {
  const [toast, setToast] = useState(false);
  const { cartState, addToCart, removeFromCart } = useCartContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddToCart = (count) => {
    setToast(true);
    addToCart(count);
  };

  return (
    <ul className="flex items-start justify-between px-4 py-4 gap-8 mt-10 md:flex-row flex-col">
      <li className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
        <h2 className="text-center text-black font-semibold text-lg tracking-wider mb-5 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Trial pack
        </h2>
        <p className="flex flex-col items-center text-center tracking-tighter mb-14">
          <span className="text-4xl font-bold">$4.99</span>
          <span className="text-black/80 text-center mt-4">20 contacts</span>
        </p>
        <button
          className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]"
          onClick={() => {handleAddToCart(20); setToast(20);}}
        >
          add to cart
        </button>
        {toast==20 && (
          <Toast>
            <HiCheck className="bg-green-100 rounded-lg text-green-500 text-2xl" />
            <div className="pl-4 text-sm ">Added to Cart</div>
          </Toast>
        )}
        <ol className="list-disc text-color4 w-[80%] mx-auto">
          <li>
            <span className="text-black text-xs font-semibold">
              Great for New Home Buyers
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Realtors Who Will Sell Homes FAST!
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Available Immediatly!
            </span>
          </li>
        </ol>
      </li>
      <li className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
        <h2 className="text-center text-black font-semibold text-lg tracking-wider mb-5 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Starter Pack
        </h2>
        <p className="flex flex-col items-center text-center tracking-tighter mb-14">
          <span className="text-4xl font-bold">$19.99</span>
          <span className="text-black/80 text-center mt-4">100 contacts</span>
        </p>
        <button
          className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]"
          onClick={() => {handleAddToCart(100); setToast(100);}}
        >
          add to cart
        </button>
        {toast==100 && (
          <Toast>
            <HiCheck className="bg-green-100 rounded-lg text-green-500 text-2xl" />
            <div className="pl-4 text-sm ">Added to Cart</div>
          </Toast>
        )}
        <ol className="list-disc text-color4 w-[80%] mx-auto">
          <li>
            <span className="text-black text-xs font-semibold">
              100 Realtor Contacts
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Realtors Representing Buyers
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Available Immediatly!
            </span>
          </li>
        </ol>
      </li>
      <li className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in relative group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-br-xl rounded-bl-xl text-color1 px-8 py-2 bg-color4 transition-all duration-150 ease-in group-hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)]">
          Hot take!
        </div>
        <h2 className="text-center font-semibold text-lg tracking-wider mb-5 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Pro Pack
        </h2>
        <p className="flex flex-col items-center text-center tracking-tighter mb-14">
          <span className="text-4xl font-bold">$49.99</span>
          <span className="text-black/80 text-center mt-4">500 contacts</span>
        </p>
        <button
          className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]"
          onClick={() => {handleAddToCart(500); setToast(500);}}
        >
          add to cart
        </button>
        {toast==500 && (
          <Toast>
            <HiCheck className="bg-green-100 rounded-lg text-green-500 text-2xl" />
            <div className="pl-4 text-sm ">Added to Cart</div>
          </Toast>
        )}
        <ol className="list-disc text-color4 w-[80%] mx-auto">
          <li>
            <span className="text-black text-xs font-semibold">
              500 High-Volume Realtor Contacts
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Use Them at Your Convienience!
            </span>
          </li>
          <li>
            <span className="text-black text-xs font-semibold">
              Great for Multiple Zip Codes!
            </span>
          </li>
        </ol>
      </li>
    </ul>
  );
};

export default Bundles;
