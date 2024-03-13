import React from 'react'
import { useCartContext } from '../Hooks/useCartContext'

const CartUI = () => {
    const { cartState } = useCartContext();

  return (
    <div>
      <p className='text-color4'>What up its ya boi SP</p>
    </div>
  )
}

export default CartUI
