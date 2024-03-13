import React from "react";
import { BsCart3 } from "react-icons/bs";
import { useCartContext } from "../Hooks/useCartContext";
import { Link } from "react-router-dom";

const CartMenu = (props) => {
  const { cartState } = useCartContext();

  const cartNumber = cartState >= 100 ? '99+' : cartState;

  return (
    <div className="relative py-2 mr-5">
      <Link to="/cart">
        <BsCart3
          className={`w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-white hover:text-color4 hover:w-8 hover:h-8 duration-500`}
        />
        {cartState > 0 && <span className={`absolute -top-0 -right-0 h-5 w-5 flex items-center justify-center rounded-full bg-color4 p-3 text-xs text-gray-700`}>{cartNumber}</span>}
      </Link>
    </div>
  );
};

export default CartMenu;
