import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    total: () =>{}
}) 

export const CartProvider = ({ children }) =>{
    const [cart, setCart] = useState([]);

    const total = () => {
        return cart.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      };


    const addItem = (item, quantity) =>{
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, {...item, quantity}])
        } else{
            console.error('El producto ya esta agregado');
        }
    }

    const removeItem = (itemId) => {
        const cartUpdate = cart.filter(prod => prod.id !== itemId)
        setCart(cartUpdate)
    }

    const clearCart = () =>{
        setCart([])
    }

    const isInCart = (itemId) =>{
        return cart.some(prod => prod.id === itemId)
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total }}>
            { children }
        </CartContext.Provider>
    )
}