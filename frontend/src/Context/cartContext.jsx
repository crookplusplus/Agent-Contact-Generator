import React, { createContext, useContext, useReducer, useEffect } from "react";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

//create Cart Context
export const CartContext = createContext();

//Cart Reducer Function
const cartReducer = (cartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return cartState + action.payload;
    case REMOVE_FROM_CART:
      return cartState - action.payload;
    case CLEAR_CART:
      return action.payload;
    default:
      return cartState;
  }
};

//Cart Provider
export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, 0, () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : 0;
  });

  //effect to save cart to local storage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  //function to add to cart
  const addToCart = (count) => {
    cartDispatch({ type: ADD_TO_CART, payload: count });
  };

  //function to remove from cart
  const removeFromCart = (count) => {
    cartDispatch({ type: REMOVE_FROM_CART, payload: count });
  };
  //function to clear cart
  const clearCart = () => {
    cartDispatch({ type: CLEAR_CART, payload: 0 });
  };

  return (
    <CartContext.Provider
      value={{ cartState, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
