import { useContext } from "react";
import { CartContext } from "../Context/cartContext";

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context){
        throw new Error(
            "useCartContext must be used within CartProvider"
        );
    }
    return context;
};