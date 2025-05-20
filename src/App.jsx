import Cart from "./components/Cart";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Products from "./components/Products";
import { CartContextProvider } from "./store/cart-context.jsx";
import { UserProgressContextProvider } from "./store/user-progress-context";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Cart />
          <Header />
          <Products />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
