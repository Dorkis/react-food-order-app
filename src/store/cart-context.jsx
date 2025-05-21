import { useReducer } from 'react';
import { createContext } from 'react';

export const CartContext = createContext({
  carts: [],
  addItem: (cart) => { },
  removeItem: (id) => { },
  removeCart: () => { },
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const cartIndex = state.carts.findIndex((cart) => cart.id === action.cart.id);
    const updatedCarts = [...state.carts];
    if (cartIndex > -1) {
      const foundedCart = state.carts[cartIndex];
      const updatedCart = {
        ...state.carts[cartIndex],
        count: foundedCart.count + 1
      }
      updatedCarts[cartIndex] = updatedCart;
    } else {
      updatedCarts.push({ ...action.cart, count: 1 });
    }

    return { ...state, carts: updatedCarts }
  } else if (action.type === 'REMOVE_ITEM') {
    const cartIndex = state.carts.findIndex((cart) => cart.id === action.id);

    const existingCart = state.carts[cartIndex];
    const updatedCarts = [...state.carts];
    if (existingCart.count === 1) {
      updatedCarts.splice(cartIndex, 1)
    } else {
      const updatedCart = {
        ...existingCart,
        count: existingCart.count - 1
      }
      updatedCarts[cartIndex] = updatedCart;
    }
    return { ...state, carts: updatedCarts }
  } else if (action.type === 'REMOVE_CART') {
    return { ...state, carts: [] }
  }

  return state;

}

export function CartContextProvider({ children }) {

  const [cart, dispatchCartAction] = useReducer(cartReducer, { carts: [] });

  function addItem(cart) {
    dispatchCartAction({ type: 'ADD_ITEM', cart })
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }

  function removeCart() {
    dispatchCartAction({ type: 'REMOVE_CART' })
  }

  const contextValue = {
    carts: cart.carts,
    addItem,
    removeItem,
    removeCart
  }

  return <CartContext value={contextValue}>{children}</CartContext>;
}

export default CartContext;