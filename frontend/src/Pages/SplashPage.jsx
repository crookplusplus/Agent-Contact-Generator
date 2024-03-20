import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ImSpinner3 } from "react-icons/im";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/redeem');
  }, 3000);

  return () => clearTimeout(timeout);
}, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col align-middle justify-center">
        <div className="flex justify-center mt-15">
          <ImSpinner3 className="animate-spin text-color4 text-6xl" />
        </div>
        <h1 className="text-color3 font-bold font-rocksalt text-4xl text-center mt-20">
          Processing Order...
        </h1>
      </div>
      <div className="bg-gradient-to-br from-whitesmoke to-silver4 rounded-3xl flex flex-col items-center mt-10 p-10">
        <p className="mx-15 text-color2">This is a simulation! <br/>
        Your order will be limited to 100 credits per day. <br/>
        You will be redirected back to the cart page in 5 seconds.
        </p>
      </div>
    </div>
  );
};

export default SplashPage;
