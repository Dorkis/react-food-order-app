import Header from "./components/Header";
import Modal from "./components/Modal";
import Products from "./components/Products";
import { CartContextProvider } from "./store/cart-context.jsx";

function App() {
  return (
    <>
    <CartContextProvider>
      <Header />
      <div id="meals">
        <Products />
      </div>
      </CartContextProvider>
    </>
  );
}

export default App;
