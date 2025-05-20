import { createContext, useState } from 'react';

export const CartContext = createContext({
  carts: null,
  modalType: '',
  handleAddToCart: (id) => { },
  handleUpCount: (id) => { },
  handleDownCount: (id) => { },
  setModalType: () => { }
});

export function CartContextProvider({ children }) {
  const [addedToCart, setAddedToCart] = useState([]);
  const [modalType, setModalType] = useState('');

  function handleAddToCart(id, name, price) {
    const cart = {
      id,
      name: name,
      price: price,
      count: 1
    }

    setAddedToCart(prevValues => {
      const findCarts = prevValues.find((cart) => cart.id === id);
      if (findCarts) {
        return [...prevValues];
      }
      return [...prevValues, cart];
    })
  }

  function handleUpCount(id) {
    console.log(id);
    setAddedToCart(prevValues => {
      return prevValues.map(cart => {
        if (cart.id === id) {
          return { ...cart, count: cart.count + 1 }
        }
        return { ...cart }
      })
    })
  }

  function handleDownCount(id) {
    console.log(id);
    setAddedToCart(prevValues => {
      return prevValues.map(cart => {
        if (cart.id === id && cart.count != 0) {
          return { ...cart, count: cart.count - 1 }
        }
        return { ...cart }
      })
    })
  }

  const contextValue = {
    carts: addedToCart,
    handleAddToCart,
    handleUpCount,
    handleDownCount,
    modalType,
    setModalType
  }

  return <CartContext value={contextValue}>{children}</CartContext>;
}