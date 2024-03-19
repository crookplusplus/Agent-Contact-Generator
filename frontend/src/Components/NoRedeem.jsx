import React from "react";
import meet from "../assets/meeting.webp";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NoRedeem = () => {
  return (
    <div className="flex flex-row justify-evenly align-center p-6 rounded-3xl">
      <div className="flex flex-col items-center jsutify-center">
        <div className="w-1/2">
          <img
            src={meet}
            alt="meeting"
            className="w-full h-full rounded-xl shadow-2xl shadow-timberwolf"
          />
        </div>
        <span className="text-white font-sil tracking-wider my-5 md:text-2xl">
        Discover Your Next Opportunity!
        </span>
        <Link to="/products">
          <Button
            gradientMonochrome="teal"
            className="font-pop font-bold text-white tracking-wide hover:scale-110 duration-500 mb-10"
          >
            Shop Now!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoRedeem;
