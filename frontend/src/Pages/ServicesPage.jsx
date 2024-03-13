import React from "react";
import Card from "../Components/Card";

const ServicesPage = () => {
  return (
    <Card>
      <div className="flex flex-col text-center">
        <h1 className="sm:text-4xl text-2xl font-extrabold italic title-font mx-2 my-4 font-sil text-color4">
          Affordable Data Solutions, So You can Focus on Closing Deals.
        </h1>
        <p className="lg:w-3/4 w-4/5 font-[Menlo] text-white mx-auto leading-relaxed text-lg font-medium mb-4">
          Flexible Pricing Built for Your Business Growth
        </p>
      </div>
      <ul className="flex items-start justify-between px-4 py-4 gap-8 mt-10 md:flex-row flex-col">
        <li className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
          <h2 className="text-center text-black font-semibold text-lg tracking-wider mb-5 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
            Trial pack
          </h2>
          <p className="flex flex-col items-center text-center tracking-tighter mb-14">
            <span className="text-4xl font-bold">$4.99</span>
            <span className="text-black/80 text-center mt-4">20 contacts</span>
          </p>
          <button className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            add to cart
          </button>
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
          <button className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            add to cart
          </button>
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
          <button className="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            add to cart
          </button>
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
      <div className="flex flex-col items-center justify-center">
      
        <p className="flex flex-col text-white justify-center text-sm m-6">
          <span className="italic">* Realtor information is subject to change.</span>
          <span className="italic">
            * Realtors Number of Transactions is based off of the number of homes sold in
            the last 18 months.
          </span>
          <span className="italic">* Realtors may overlap in neighboring zip codes.</span>
        </p>
      </div>
    </Card>
  );
};

export default ServicesPage;
