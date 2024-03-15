import React, { useState, useEffect } from 'react'
import { useCartContext } from '../Hooks/useCartContext'
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const UpSellCard = () => {
    const { cartState } = useCartContext();
    const [ info, setInfo ] = useState(null);

    useEffect(() => {}, []);

    useEffect(() => {
        switch (true) {
            case cartState > 0 && cartState < 20:
                setInfo("Want to add more to your cart?");
                break;
            case cartState < 100:
                setInfo("You are paying full price per contact! Add more to save!");
                break;
            case cartState == 100:
                setInfo("You've saved 20% per contact!");
                break;
            case cartState > 100 && cartState < 500:
                setInfo("You've saved 20% per contact! Add more to save more!");
                break;
            case cartState >= 500:
                setInfo("You've saved 60% per contact from full price!");
                break;
            default:
                setInfo("");
        }
    }, [cartState]);


  return (
    <div className="bg-gradient-to-t from-color5 via-color4 to-color5 border-4 rounded-lg border-solid border-color2 ">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text- italic font-pop text-2xl p-4">
            {info}  
        </h2>
        {cartState < 20  && <Link to="/products">
            <Button className="bg-color4 text-color2 hover:bg-color5 mb-2">Shop Now</Button>
        </Link>}
      </div>
    </div>
  )
}

export default UpSellCard
