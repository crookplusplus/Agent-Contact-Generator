import React from "react";
import { useCartContext } from "../Hooks/useCartContext";
import { Carousel } from "flowbite-react";
import image1 from "../assets/CP-Photos/1_thereisnothingoverthere.jpg";
import image2 from "../assets/CP-Photos/2_strictly_business.jpg";
import image3 from "../assets/CP-Photos/3_Meeting_1.jpg";
import image4 from "../assets/CP-Photos/4_sign_here.jpg";
import image5 from "../assets/CP-Photos/5_Handshake.jpg";

const PicCaro = () => {
  const { cartState } = useCartContext();

  return (
    <div className="relative flex items-center justify-center h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel indicators={false}>
        <img src={image1} alt="1" />
        <img src={image2} alt="2" />
        <img src={image3} alt="3" />
        <img src={image4} alt="4" />
        <img src={image5} alt="5" />
      </Carousel>
    </div>
  );
};

export default PicCaro;
