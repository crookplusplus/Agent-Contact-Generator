import React from "react";
import emptyCart from "../assets/CP-Photos/emptyCart.jpg";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col h-full items-center justify-center my-5 ">
        <img
          src={emptyCart}
          alt="empty cart"
          className="rounded-full h-56 sm:h-64 xl:h-80 2xl:h-96 shadow-2xl shadow-color4"
        />

        <span className="text-white font-sil tracking-wider my-5 md:text-2xl">
          Looks like your cart is empty!
        </span>
        <span className="text-white font-sil tracking-wider md:text-2xl mb-5">
          Let's go make some Connections!
        </span>
        <Link to="/products">
          <Button
            gradientMonochrome="teal"
            className="font-pop font-bold text-white tracking-wide hover:scale-110 duration-500 mb-10"
          >
            Shop Now!
          </Button>
        </Link>
        <span className="text-xs text-color1">
          <a
            href="https://www.freepik.com/free-vector/shopping-cart-vector-technology-icon-silver-gray-background_16268001.htm#page=2&query=empty%20cart&position=1&from_view=keyword&track=ais&uuid=6521cb04-487c-4333-bbb7-11b5c393ab25"
            target="blank"
            className="text-xs"
          >
            Image by rawpixel.com
          </a>{" "}
        </span>
        <span className="text-xs text-color1">on Freepik</span>
      </div>
    </div>
  );
};

export default EmptyCart;
