import React from "react";
import Card from "../Components/Card"
import MenuButton from "../Components/MenuButton";

const HomePage = () => {
  return (
    <Card>
      <div className='flex flex-col text-center'>
        <h1 className="sm:text-3xl text-2xl font-rocksalt font-extrabold italic title-font mx-2 my-4 text-color4 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          More Time Spent Connecting
        </h1>
        <p className="lg:w-2/3 w-4/5 mx-auto leading-relaxed text-lg text-color3 font-medium mb-4">There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.There is no longer a need to spend time searching
         for Real Estate Agents' contact information! Simply create an account and purchase a list of the top-selling Real Estate Agents in your area!
         The list is downloadable and contains the Agents preferred contact information.
        </p>
      </div>
      <div className="flex justify-center my-4 gap-2">
        <div className="items-center">
          <MenuButton site='/services' name='See Packages'/>
        </div>
        <div className="items-center">
          <MenuButton site='/home' name='Login/Sign Up'/>
        </div>
      </div>
    </Card>
  );
}

export default HomePage;
