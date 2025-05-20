import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import UserProgressContext from '../store/user-progress-context';
import { CartContext } from "../store/cart-context";
import Button from '../UI/Button';

export default function Header() {
    const { carts } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    return (
        <>
            <header id="main-header">
                <div id='title'>
                    <img src={logo} alt="food logo" />
                    <h1>Food order app</h1>

                </div>
                <nav>
                    <Button onClick={showCart}>cart ({carts.length})</Button>
                </nav>
            </header>
        </>
    )
}