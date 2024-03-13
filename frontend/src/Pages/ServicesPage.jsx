import React from "react";
import Card from "../Components/Card";
import Bundles from "../Components/Bundles";
import Warnings from "../Components/Warnings";

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
      <Bundles />
      <Warnings />
    </Card>
  );
};

export default ServicesPage;
