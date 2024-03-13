import React from "react";
import UserSidebar from "../Components/UserSidebar";
import UserMenuSm from "../Components/UserMenuSm";
import Bundles from "../Components/Bundles";
import Warnings from "../Components/Warnings";

const ProductsPage = () => {
  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
        <div className="container flex flex-col items-center justify-center bg-color2 rounded-lg p-6">
          <h1 className="text-color4 font-rocksalt font-bold text-xl tracking-wide">
            Struggling to Connect with Qualified Leads?
          </h1>
          <h1 className="text-color3 font-sil font-bold tracking-wide text-xl m-6">
            Unlock Direct Access to Top Real Estate Agents Today!
          </h1>
          <Bundles />
          <Warnings />
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
