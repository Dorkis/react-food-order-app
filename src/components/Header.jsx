import { useRef } from 'react';
import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import { CartContext } from '../store/cart-context';
import Modal from './Modal';

export default function Header() {
    const dialog = useRef();
    const { carts } = useContext(CartContext);

    function handleOpenCart() {
        dialog.current.open();
    }

    return (
        <>
        <Modal ref={dialog} />
        <header id="main-header">
            <div id='title'>
                <img src={logo} alt="food logo" />
                <h1>Food order app</h1>
                <button className='button cart-total' onClick={handleOpenCart}>cart({carts.length})</button>
            </div>
        </header>
        </>
    )
}