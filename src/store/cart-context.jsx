import { createContext, useState } from 'react';

export const CartContext = createContext({
  carts: null,
  handleAddToCart: (id) => {},
});

export function CartContextProvider({ children }) {
  const [addedToCart, setAddedToCart] = useState([]);

  function handleAddToCart(id) {
    setAddedToCart(prevValues => {
      return !prevValues.includes(id) ? [id, ...prevValues] : [...prevValues]
    })
  }

  const contextValue = {
    carts: addedToCart,
    handleAddToCart
  }

  return <CartContext value={contextValue}>{children}</CartContext>;
}