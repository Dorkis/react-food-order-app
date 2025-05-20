import Header from "./components/Header";
import Modal from "./components/Modal";
import Products from "./components/Products";
import { CartContextProvider } from "./store/cart-context.jsx";

function App() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Products />
      </CartContextProvider>
    </>
  );
}

export default App;
