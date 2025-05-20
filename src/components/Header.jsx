import { useRef } from 'react';
import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import { CartContext } from '../store/cart-context';
import Button from '../UI/Button';
import Cart from './Cart';
import Modal from './Modal';

export default function Header() {
    const dialog = useRef();
    const { carts, modalType, setModalType } = useContext(CartContext);

    function handleOpenCart() {
        setModalType('cart');
        dialog.current.open();
    }

    return (
        <>
            <Modal ref={dialog} >{modalType === 'cart' && <Cart />}</Modal>
            <header id="main-header">
                <div id='title'>
                    <img src={logo} alt="food logo" />
                    <h1>Food order app</h1>

                </div>
                <nav>
                    <Button onClick={handleOpenCart}>cart ({carts.length})</Button>
                </nav>
            </header>
        </>
    )
}