import { useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
    progress: '', //cart, checkout
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }
    function hideCheckout() {
        setUserProgress('');
    }
    const contextValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }
    return (
        <UserProgressContext value={contextValue}>{children}</UserProgressContext>
    )
}

export default UserProgressContext;