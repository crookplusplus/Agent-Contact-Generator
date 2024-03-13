import React from 'react';
import { BsCart3 } from "react-icons/bs";
import { useCartContext } from '../Hooks/useCartContext';

const CartIcon = (props) => {
    const { cartState } = useCartContext();
    
    //color props in tailwind css syntax
    const { iconColor, badgeColor, badgeText } = props;
    const cartNumber = cartState >= 100 ? '99+' : cartState;
    

  return (
    <div className='relative py-2'>
      <BsCart3 className={`w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-${iconColor}`}/>
      {cartState > 0 && <span className={`absolute -top-0 -right-0 h-5 w-5 flex items-center justify-center rounded-full bg-${badgeColor} p-3 text-xs text-${badgeText}`}>{cartNumber}</span>}
    </div>
  )
}

export default CartIcon
