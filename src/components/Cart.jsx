import { useRef } from "react";
import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import UserProgressContext from "../store/user-progress-context";
import Button from "../UI/Button";
import Modal from './Modal';

export default function Cart() {
    const { carts, removeItem, addItem } = useContext(CartContext);
    const { progress, showCheckout } = useContext(UserProgressContext);
    const dialog = useRef();

    return (
        <Modal ref={dialog} className="result-modal" open={progress === 'cart'}>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul >
                    {carts.map(cart => {
                        return (
                            <li className="cart-item" key={cart.name} >
                                <p>{cart.name} {cart.price}</p>
                                <div className="cart-item-actions">
                                    <button onClick={() => removeItem(cart.id)}>-</button>
                                    {cart.count}
                                    <button onClick={() => addItem(cart)}>+</button>
                                </div>
                            </li>)
                    })}
                </ul>
                <div className="cart-total">{carts && carts.reduce((total, cart) => (total + cart.count * cart.price), 0).toFixed(2)} zł</div>
                <form method="dialog" className="modal-actions" >
                    <Button textOnly >Close</Button>
                    <Button onClick={showCheckout}>Go to checkout</Button>
                </form>
            </div>
        </Modal>
    )
}